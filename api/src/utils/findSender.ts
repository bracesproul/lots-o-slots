import {
  BANK_OF_AMERICA_DEPOSITS_SUBJECT,
  CashAppPaymentEmailData,
  CashappSnippedData,
  CASHAPP_DEPOSITS_SUBJECT,
  CASHAPP_WITHDRAWALS_SUBJECT,
  EmailObjectType,
  PayPalDecodedData,
  PAYPAL_DEPOSITS_SUBJECT,
  ProviderEmail,
  ZelleSnippetData,
} from '@/types';
import {
  parseCashAppEmail,
  parsePayPalPayment,
  parseZellePayment,
} from '@/services';
import EmailLog, { EmailLogType } from '@/entities/EmailLog/EmailLog';
import { logEmail } from '.';
import { getRepository } from 'typeorm';
import { handleWithdrawal } from '@/services/cashapp/handleWithdrawal';
import { handleReceivedPayment } from '@/services/cashapp/handleReceivedPayment';
import { LogType } from './logEmail';

export async function findSender(
  email: EmailObjectType,
  cashappData?: CashAppPaymentEmailData | null,
  snippetData?: CashappSnippedData | null,
  zelleSnippetData?: ZelleSnippetData | null,
  paypalData?: PayPalDecodedData | null
): Promise<void> {
  const { from, subject, body, id } = email;

  const hasEmailBeenLogged = await getRepository(EmailLog).findOne({
    where: { emailId: id },
  });

  if (hasEmailBeenLogged) {
    console.log('Email has already been logged');
    return;
  }

  await logEmail({
    email,
    description: 'Searching for sender...',
    type: EmailLogType.NO_PROVIDER,
  });

  // If snippet data is true, we already know it's a cashapp email and is a withdrawal.
  if (snippetData && from === ProviderEmail.CASHAPP) {
    await handleWithdrawal(email, snippetData);
    return;
  }

  // If zelle snippet data is true, we already know it's a BOFA email and is a zelle payment received.
  if (zelleSnippetData && from === ProviderEmail.BANK_OF_AMERICA) {
    await parseZellePayment(email, zelleSnippetData);
    return;
  }

  // If paypal data is true, we already know it's a paypal email and is a payment received.
  if (paypalData && from === ProviderEmail.PAYPAL) {
    await parsePayPalPayment(email, paypalData);
    return;
  }

  if (
    from === ProviderEmail.CASHAPP &&
    subject.includes(CASHAPP_DEPOSITS_SUBJECT)
  ) {
    await handleReceivedPayment(email, cashappData);
    return;
  }

  if (
    from === ProviderEmail.CASHAPP ||
    from === ProviderEmail.BANK_OF_AMERICA ||
    from === ProviderEmail.PAYPAL
  ) {
    if (
      subject.includes(CASHAPP_DEPOSITS_SUBJECT) ||
      subject.includes(BANK_OF_AMERICA_DEPOSITS_SUBJECT) ||
      subject.includes(PAYPAL_DEPOSITS_SUBJECT) ||
      subject.includes(CASHAPP_WITHDRAWALS_SUBJECT)
    ) {
      await logEmail({
        email,
        description: 'Email meets criteria but no data found',
        type: EmailLogType.NO_PROVIDER,
        logType: LogType.ERROR,
      });
      return;
    }
  }

  if (
    from.includes('bankofamerica.com') ||
    body.includes('Please allow up to 5 minutes for the')
  ) {
    await parseZellePayment(email);
  } else if (subject.includes(PAYPAL_DEPOSITS_SUBJECT)) {
    await parsePayPalPayment(email);
  } else if (
    email.from === ProviderEmail.CASHAPP ||
    email.subject.includes(CASHAPP_DEPOSITS_SUBJECT) ||
    checkCashAppEmailDev(body) ||
    cashappData
  ) {
    await parseCashAppEmail(email, cashappData);
  } else {
    await logEmail({
      email,
      description: 'No provider found',
      type: EmailLogType.NO_PROVIDER,
    });
  }
}

const checkCashAppEmailDev = (body: string) => {
  if (
    body.includes('Amount') &&
    body.includes('Destination') &&
    body.includes('Identifier') &&
    body.includes('Payment from')
  ) {
    return true;
  }
  return false;
};
