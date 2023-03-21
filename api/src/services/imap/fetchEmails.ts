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
} from '@/repositories';
import { ParsedEmailPayload } from '@/types/parsed-email';
import { PaymentStatus, PaymentType } from '@/entities/Transaction/types';
import { PaymentProvider } from '@/entities/Payment/Payment';

export enum EmailType {
  PAYPAL = 'PAYPAL',
  BOFA = 'BOFA',
  CASHAPP_DEPOSIT = 'CASHAPP_DEPOSIT',
  CASHAPP_WITHDRAWAL = 'CASHAPP_WITHDRAWAL',
}

async function getRecentEmail(type: EmailType) {
  const provider =
    type === EmailType.PAYPAL
      ? PaymentProvider.PAYPAL
      : type === EmailType.BOFA
      ? PaymentProvider.ZELLE
      : PaymentProvider.CASHAPP;
  const emailLog = await getCustomRepository(
    TransactionRepository
  ).getRecentUpdate(provider);
  return emailLog?.emailLog.emailId ?? 0;
}

export function execute(from: string, type: EmailType) {
  imap.openBox('INBOX', false, function (err: any, mailBox: any) {
    console.log('mailBox');
    if (err) {
      console.error('error opening inbox', err);
      return;
    }
    imap.search([['FROM', from]], async (err: any, results: any) => {
      if (!results || !results.length) {
        console.log('No unread mails');
        imap.end();
        return;
      }

      // Limit the number of emails fetched to 50
      const fetchOptions = {
        bodies: '',
        limit: 5,
      };

      const recentId = await getRecentEmail(type);

      const f = imap.fetch(results, fetchOptions);
      f.on('message', (msg: any, seqno: any) => {
        if (seqno > recentId) {
          // processMessage(msg, seqno, type);
          return;
        }
      });
      f.once('error', function (err: any) {
        return Promise.reject(err);
      });
      f.once('end', function () {
        console.log('Done fetching all unseen messages.');
        imap.end();
      });
    });
  });
}

function processMessage(msg: any, seqno: any, type: EmailType) {
  let subject = '';
  let to = '';

  const parser = new MailParser();
  parser.on('headers', (headers: any) => {
    subject = headers.get('subject');
    to = headers.get('to').value[0].address;
  });

  parser.on('data', async (data: any) => {
    if (data.type === 'text') {
      const emailId = Number(seqno);
      const previousEmailLog = await getCustomRepository(
        EmailLogV2Repository
      ).findByEmailId(emailId);
      if (previousEmailLog) {
        console.log('Email already processed');
        return;
      }

      const emailLog = await getCustomRepository(EmailLogV2Repository).create({
        emailId,
        subject,
        body: data.text,
        receivedAt: new Date(),
      });

      let payload: ParsedEmailPayload = {
        success: false,
        data: null,
      };

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
        const cashAppPayload = await parseCashAppPayment(data.text);
        if (cashAppPayload) {
          payload = cashAppPayload;
        }
      }

      if (payload.data && payload.success) {
        const provider = () => {
          if (type === EmailType.PAYPAL) return PaymentProvider.PAYPAL;
          if (type === EmailType.BOFA) return PaymentProvider.ZELLE;
          return PaymentProvider.CASHAPP;
        };

        const paymentType = () => {
          if (type === EmailType.CASHAPP_WITHDRAWAL)
            return PaymentType.WITHDRAWAL;
          return PaymentType.DEPOSIT;
        };

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
        if (
          type === EmailType.CASHAPP_WITHDRAWAL ||
          type === EmailType.CASHAPP_DEPOSIT
        ) {
          const cashAppTransaction = await getCustomRepository(
            CashAppTransactionRepository
          ).create({
            transaction,
            transactionId: transaction.id,
            amount: payload.data.amount,
            cashtag: payload.data.name,
            cashAppId: payload.data.transactionId,
          });
          await getCustomRepository(TransactionRepository).update({
            id: transaction.id,
            cashAppTransaction,
            cashAppTransactionId: cashAppTransaction.id,
          });
        }
        if (type === EmailType.PAYPAL) {
          const payPalTransaction = await getCustomRepository(
            PayPalTransactionRepository
          ).create({
            transaction,
            transactionId: transaction.id,
            amount: payload.data.amount,
            senderIdentifier: payload.data.name,
            payPalId: payload.data.transactionId,
          });
          await getCustomRepository(TransactionRepository).update({
            id: transaction.id,
            payPalTransaction,
            payPalTransactionId: payPalTransaction.id,
          });
        }
        if (type === EmailType.BOFA) {
          const bankOfAmericaTransaction = await getCustomRepository(
            BankOfAmericaTransactionRepository
          ).create({
            transaction,
            transactionId: transaction.id,
            amount: payload.data.amount,
            senderIdentifier: payload.data.name,
          });
          await getCustomRepository(TransactionRepository).update({
            id: transaction.id,
            bankOfAmericaTransaction,
            bankOfAmericaTransactionId: bankOfAmericaTransaction.id,
          });
        }
      }
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
}
