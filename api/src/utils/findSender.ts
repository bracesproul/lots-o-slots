import {
  CashAppPaymentEmailData,
  CashappSnippedData,
  EmailObjectType,
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

export async function findSender(
  email: EmailObjectType,
  cashappData?: CashAppPaymentEmailData | null,
  snippetData?: CashappSnippedData | null
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
  if (snippetData) {
    await handleWithdrawal(email, snippetData);
    return;
  }

  if (
    from.includes('bankofamerica.com') ||
    body.includes('Please allow up to 5 minutes for the')
  ) {
    await parseZellePayment(email);
  } else if (subject.includes(`You've got money`)) {
    await parsePayPalPayment(email);
  } else if (
    email.from === 'cash@square.com' ||
    email.subject.includes(' sent you $') ||
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
