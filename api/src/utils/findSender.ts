import { EmailObjectType } from '@/types';
import { parseZellePayment, parsePayPalPayment } from '@/utils';

export async function findSender(email: EmailObjectType): Promise<void> {
  const { from, subject, body } = email;
  if (
    from.includes('bankofamerica.com') ||
    body.includes('Please allow up to 5 minutes for the')
  ) {
    await parseZellePayment(email);
  } else if (subject.includes(`You've got money`)) {
    await parsePayPalPayment(email);
  } else if (from.includes('cashapp')) {
    // parse cashapp payment.
  }
}
