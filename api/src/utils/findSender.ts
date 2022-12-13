import { EmailObjectType } from '@/types';
import {
  parseCashAppEmail,
  parsePayPalPayment,
  parseZellePayment,
} from '@/services';

export async function findSender(email: EmailObjectType): Promise<void> {
  const { from, subject, body, to } = email;
  if (
    from.includes('bankofamerica.com') ||
    body.includes('Please allow up to 5 minutes for the')
  ) {
    await parseZellePayment(email);
  } else if (subject.includes(`You've got money`)) {
    await parsePayPalPayment(email);
  } else if (
    from.includes('cashapp') ||
    checkCashAppEmailDev(body) ||
    to.includes('cashapp')
  ) {
    await parseCashAppEmail(email);
  } else {
    console.log('no provider');
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
