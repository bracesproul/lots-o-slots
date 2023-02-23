import { EmailLogType } from '@/entities/EmailLog/EmailLog';
import {
  CashAppPaymentEmailData,
  CASHAPP_DEPOSITS_SUBJECT,
  EmailObjectType,
} from '@/types';
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
  email: EmailObjectType,
  cashappData?: CashAppPaymentEmailData | null
): Promise<ParsedPaymentResponse> {
  const { subject } = email;
  if (subject.includes(CASHAPP_DEPOSITS_SUBJECT) || cashappData) {
    return await handleReceivedPayment(email, cashappData);
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
