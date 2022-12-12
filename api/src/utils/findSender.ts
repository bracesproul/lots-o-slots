import { EmailObjectType } from '@/types';
import { parseZellePayment, parsePayPalPayment } from '@/utils';

export async function findSender(email: EmailObjectType): Promise<void> {
  const { from, subject } = email;
  if (from.includes('zelle')) {
    return await parseZellePayment(email);
  } else if (subject.includes(`You've got money`)) {
    await parsePayPalPayment(email);
  } else if (from.includes('cashapp')) {
    // parse cashapp payment.
  }
}
