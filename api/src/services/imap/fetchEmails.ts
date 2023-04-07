import { imap } from './config';
import { MailParser } from 'mailparser';
import {
  parsePayPalPayment,
  parseZellePayment,
  parseCashAppPayment,
} from './utils';
import { getCustomRepository } from 'typeorm';
import {
  EmailLogV2Repository,
  TransactionRepository,
  PayPalTransactionRepository,
  BankOfAmericaTransactionRepository,
  CashAppTransactionRepository,
  AccountRepository,
} from '@/repositories';
import { ParsedEmailPayload } from '@/types/parsed-email';
import { PaymentStatus, PaymentType } from '@/entities/Transaction/types';
import { PaymentProvider } from '@/entities/Payment/Payment';
import {
  EmailLogV2,
  Account,
  PayPalTransaction,
  BankOfAmericaTransaction,
  CashAppTransaction,
} from '@/entities';
import { stripHtml } from 'string-strip-html';
import { DiscordLog } from '../discord';

export enum EmailType {
  PAYPAL = 'PAYPAL',
  BOFA = 'BOFA',
  CASHAPP_DEPOSIT = 'CASHAPP_DEPOSIT',
  CASHAPP_WITHDRAWAL = 'CASHAPP_WITHDRAWAL',
  UNKNOWN = 'UNKNOWN',
}

enum EmailSender {
  PAYPAL = 'service@paypal.com',
  BOFA = 'customerservice@ealerts.bankofamerica.com',
  CASHAPP = 'cash@square.com',
}

type NQ = (string | NQ)[];
let FROM_QUERY: NQ = [];
const FROM_LIST = [EmailSender.BOFA, EmailSender.PAYPAL, EmailSender.CASHAPP];

FROM_LIST.forEach((value, index) => {
  const core = ['FROM', value];
  FROM_QUERY = index === 0 ? core : ['OR', core, [...FROM_QUERY]];
});

function getTypeFromSender(sender: string) {
  switch (sender) {
    case EmailSender.PAYPAL:
      return EmailType.PAYPAL;
    case EmailSender.CASHAPP:
      return EmailType.CASHAPP_DEPOSIT;
    case EmailSender.BOFA:
      return EmailType.BOFA;
    default:
      return EmailType.UNKNOWN;
  }
}

export function execute() {
  return new Promise((resolve) => {
    try {
      imap.search([FROM_QUERY, ['UNSEEN']], async (err: any, results: any) => {
        if (err) {
          console.error(
            'ERROR @ imap.search(). Killing connection. ERROR: ',
            err
          );
          imap.end();
          resolve(false);
          return;
        }

        if (!results || !results.length) {
          console.log('No unread mails');
          resolve(true);
          return;
        }

        // Limit the number of emails fetched to 50
        const fetchOptions = {
          bodies: ['TEXT', 'HEADER.FIELDS (TO FROM SUBJECT)'],
        };
        const needToMark: any[] = [];

        const f = imap.fetch(results, fetchOptions);
        f.on('message', async (msg: any, seqno: any) => {
          processMessage(msg, seqno);
          // Mark the email as read after parsing it
          msg.once('attributes', function (attrs: any) {
            const flags = attrs.flags.map((flag: any) => flag.toUpperCase());
            if (!flags.includes('\\SEEN')) {
              needToMark.push(attrs.uid);
            }
          });
        });
        f.once('error', function (err: any) {
          resolve(false);
        });
        f.once('end', function () {
          imap.addFlags(needToMark, '\\Seen', function (err: any) {
            if (err) console.error(err);
            else console.log(`Marked ${needToMark.length} as read`);
            resolve(true);
          });
        });
      });
    } catch (e) {
      console.error('ERROR RUNNING EXECUTE IMAP', e);
      const discordLog = new DiscordLog();
      discordLog.baseError({
        title: 'Error processing message',
        description: JSON.stringify(e),
        stack: 'api/src/services/imap/fetchEmails.ts:execute()',
      });
      resolve(false);
    }
  });
}

function processMessage(msg: any, seqno: any) {
  try {
    let subject = '';
    let to = '';
    let from = '';
    let type: EmailType;

    const parser = new MailParser();
    parser.on('headers', (headers: any) => {
      subject = headers.get('subject');
      from = headers.get('from')['value'][0]['address'];
      to = headers.get('to')['value'][0]['address'];
      // from = headers.get('from').value[0].address;
      // to = headers.get('to').value[0].address;
      type = getTypeFromSender(from);
    });

    parser.on('data', async (data: any) => {
      const emailId = Number(seqno);
      let emailLog: EmailLogV2 = {} as EmailLogV2;
      let payload: ParsedEmailPayload = {
        success: false,
        data: null,
      };

      const previousEmailLog = await getCustomRepository(
        EmailLogV2Repository
      ).findByEmailId(emailId);
      if (previousEmailLog) {
        return;
      }

      if (data.type === 'text') {
        emailLog = await getCustomRepository(EmailLogV2Repository).create({
          emailId,
          subject,
          body: data.text,
          receivedAt: new Date(),
        });
        if (type === EmailType.PAYPAL) {
          const payPalPayload = parsePayPalPayment(data.text);

          if (payPalPayload) {
            payload = payPalPayload;
          }
        } else if (type === EmailType.BOFA) {
          const bofaPayload = parseZellePayment(data.text);

          if (bofaPayload) {
            payload = bofaPayload;
          }
        } else if (type === EmailType.CASHAPP_DEPOSIT) {
          const bodyStippedHtml = stripHtml(data.html).result;
          const cashAppPayload = await parseCashAppPayment(bodyStippedHtml);
          await getCustomRepository(EmailLogV2Repository).update({
            ...emailLog,
            body: bodyStippedHtml,
          });
          if (cashAppPayload) {
            payload = cashAppPayload;

            // Update account balance
            const account = await getCustomRepository(
              AccountRepository
            ).findCashappAccountByEmail(to);
            if (account && !!payload.data?.amount) {
              await getCustomRepository(AccountRepository).creditAccountBalance(
                {
                  id: account.id,
                  amount: payload.data.amount,
                }
              );
            }
          }
        }
      }

      if (payload.data && payload.success) {
        await getCustomRepository(EmailLogV2Repository).markAsProcessed({
          id: emailLog.id,
        });

        const provider = () => {
          if (type === EmailType.PAYPAL) return PaymentProvider.PAYPAL;
          if (type === EmailType.BOFA) return PaymentProvider.ZELLE;
          return PaymentProvider.CASHAPP;
        };

        const paymentType = () => {
          // if (type === EmailType.CASHAPP_WITHDRAWAL)
          //   return PaymentType.WITHDRAWAL;
          return PaymentType.DEPOSIT;
        };

        let cashAppTransaction: CashAppTransaction | undefined;
        let payPalTransaction: PayPalTransaction | undefined;
        let bankOfAmericaTransaction: BankOfAmericaTransaction | undefined;
        let hasTransactionBeenLogged = false;

        const transaction = await getCustomRepository(
          TransactionRepository
        ).create({
          status: PaymentStatus.PENDING,
          amount: payload.data.amount,
          senderName: payload.data.name,
          emailLog,
          emailLogId: emailLog.id,
          provider: provider(),
          paymentType: paymentType(),
        });
        if (type === EmailType.CASHAPP_DEPOSIT) {
          const previousCashAppTransaction = await getCustomRepository(
            CashAppTransactionRepository
          ).checkDuplicateByCashAppId(payload.data.transactionId);
          if (previousCashAppTransaction) {
            hasTransactionBeenLogged = true;
          } else {
            cashAppTransaction = await getCustomRepository(
              CashAppTransactionRepository
            ).create({
              transaction,
              transactionId: transaction.id,
              amount: payload.data.amount,
              cashtag: payload.data.name,
              cashAppId: payload.data.transactionId,
            });
          }
        } else if (type === EmailType.PAYPAL) {
          payPalTransaction = await getCustomRepository(
            PayPalTransactionRepository
          ).create({
            transaction,
            transactionId: transaction.id,
            amount: payload.data.amount,
            senderIdentifier: payload.data.name,
            payPalId: payload.data.transactionId,
          });
        } else if (type === EmailType.BOFA) {
          bankOfAmericaTransaction = await getCustomRepository(
            BankOfAmericaTransactionRepository
          ).create({
            transaction,
            transactionId: transaction.id,
            amount: payload.data.amount,
            senderIdentifier: payload.data.name,
          });
        }
        if (hasTransactionBeenLogged) return;
        await getCustomRepository(TransactionRepository).update({
          id: transaction.id,
          bankOfAmericaTransaction,
          bankOfAmericaTransactionId: bankOfAmericaTransaction?.id,
          cashAppTransaction,
          cashAppTransactionId: cashAppTransaction?.id,
          payPalTransaction,
          payPalTransactionId: payPalTransaction?.id,
        });
      }
    });

    msg.on('body', function (stream: any) {
      stream.on('data', function (chunk: any) {
        parser.write(chunk.toString('utf8'));
      });
    });
    msg.once('end', function () {
      console.log('Finished msg #' + seqno);
      parser.end();
    });
  } catch (e) {
    console.error('ERROR PROCESSING MESSAGE', e);
    const discordLog = new DiscordLog();
    discordLog.baseError({
      title: 'Error processing message',
      description: JSON.stringify(e),
      stack: 'api/src/services/imap/fetchEmails.ts:processMessage()',
    });
  }
}
