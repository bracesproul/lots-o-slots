import { EmailObjectType } from '@/types';
import { parseZellePayment, parsePayPalPayment } from '@/utils';

export async function findSender(email: EmailObjectType): Promise<void> {
  console.log('inside findSender!', email);
  const { from } = email;
  if (from.includes('zelle')) {
    return await parseZellePayment(email);
  }
  if (from.includes('paypal')) {
    return await parsePayPalPayment(email);
  }
  if (from.includes('cashapp')) {
    // parse cashapp payment.
  }
}
