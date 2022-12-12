import { EmailObjectType } from '@/types';
import { parseZellePayment, parsePayPalPayment } from '@/utils';

export async function findSender(email: EmailObjectType): Promise<void> {
  const { from, subject } = email;
  if (from.includes('zelle')) {
    return await parseZellePayment(email);
  } else if (subject.includes(`You've got money`)) {
    console.log('paypal payment!');
    const createdResponse = await parsePayPalPayment(email);
    if (createdResponse.success) {
      console.log('paypal payment created!');
    } else {
      console.log('paypal payment failed to create!');
    }
  } else if (from.includes('cashapp')) {
    // parse cashapp payment.
  }
}
