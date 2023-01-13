import { EmailObjectType } from '@/types';
import { handlePayout } from './handlePayout';
import { handleReceivedPayment } from './handleReceivedPayment';
import { handleWithdrawal } from './handleWithdrawal';

type ParsedPaymentResponse = {
  success: boolean;
  amount: number;
  name: string | null;
  transactionId: string;
  cashTag: string | null;
};

export async function parseCashAppEmail(
  email: EmailObjectType
): Promise<ParsedPaymentResponse> {
  const { subject, body } = email;
  if (subject.includes('sent you $')) {
    return await handleReceivedPayment(email);
  } else if (subject.includes('You paid')) {
    console.log('payout', { subject, body });
    return await handlePayout(email);
  } else if (subject.includes('You purchased Bitcoin')) {
    return await handleWithdrawal(email);
  } else {
    return {
      success: false,
      amount: 0,
      name: null,
      cashTag: null,
      transactionId: '',
    };
  }
}
