import { EmailLogType } from '@/entities/EmailLog/EmailLog';
import { EmailObjectType } from '@/types';
import { logEmail } from '@/utils';
import { LogType } from '@/utils/logEmail';
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
  const { subject } = email;
  if (subject.includes('sent you $')) {
    return await handleReceivedPayment(email);
  } else if (subject.includes('You paid')) {
    return await handlePayout(email);
  } else if (subject.includes('You purchased Bitcoin')) {
    return await handleWithdrawal(email);
  } else {
    await logEmail({
      email,
      description: 'Cashapp email, no action found',
      type: EmailLogType.CASHAPP,
      processed: false,
      logType: LogType.WARNING,
    });
    return {
      success: false,
      amount: 0,
      name: null,
      cashTag: null,
      transactionId: '',
    };
  }
}
