import { EmailObjectType, PayPalDecodedData } from '@/types';
import { PaymentRepository, EmailLogRepository } from '@/repositories';
import { getCustomRepository } from 'typeorm';
import { PaymentProvider, PaymentType } from '@/entities/Payment/Payment';
import { PaymentInfoType } from '@/types/paymentInfo';
import { EmailLogType } from '@/entities/EmailLog/EmailLog';
import { logEmail } from '@/utils';

export async function parsePayPalPayment(
  email: EmailObjectType,
  paypalData?: PayPalDecodedData
) {
  if (email.subject.includes('eCheque') || email.body.includes('eCheque')) {
    console.warn('eCheque', email);
  }

  let amount: number;
  let name: string;
  let transactionId: string;

  if (paypalData) {
    amount = Number(paypalData.amount);
    name = paypalData.customerName ?? '';
    transactionId = paypalData.transactionId ?? '';
  } else {
    let { body } = email;
    body = body.replace(/\r/g, '');
    const senderNameRegex = /^(.*) sent you /m;
    const senderNameMatch = body.match(senderNameRegex);

    const amountRegex = new RegExp('\\$(\\d+\\.\\d\\d) USD');
    const amountMatch = body.match(amountRegex);

    const transactionRegex = /.Transaction ID.\n(.*?)$/m;
    const transactionMatch = body.match(transactionRegex);

    if (!amountMatch || !senderNameMatch || !transactionMatch) {
      return {
        success: false,
      };
    }
    amount = Number(amountMatch[1]);
    name = senderNameMatch[1];
    transactionId = transactionMatch[1];
  }

  await updateDatabase({
    amount,
    name,
    transactionId,
    email,
  });

  await logEmail({
    email,
    description: 'Logged PayPal payment',
    type: EmailLogType.PAYPAL,
    processed: true,
  });

  return {
    success: true,
    amount,
    name,
    transactionId,
  };
}

async function updateDatabase(paymentInfo: PaymentInfoType) {
  const paymentRepository = getCustomRepository(PaymentRepository);

  return paymentRepository.createPayment({
    userIdentifier: paymentInfo.name,
    amount: paymentInfo.amount,
    emailId: paymentInfo.email.id,
    provider: PaymentProvider.PAYPAL,
    transactionId: paymentInfo.transactionId,
    senderName: paymentInfo.name,
    paymentType: PaymentType.DEPOSIT,
  });
}
