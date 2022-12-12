import { EmailObjectType } from '@/types';
import { Payment, User } from '@/entities';
import { PaymentRepository } from '@/repositories';
import { getCustomRepository } from 'typeorm';
import { PaymentProvider } from '@/entities/Payment/Payment';

type PaymentInfoType = {
  amount: number;
  name: string;
  transactionId: string;
  email: EmailObjectType;
};

export async function parsePayPalPayment(email: EmailObjectType) {
  let { body } = email;
  console.log('body', body);
  body = body.replace(/\r/g, '');
  const senderNameRegex = /^(.*) sent you /m;
  const senderNameMatch = body.match(senderNameRegex);

  const amountRegex = new RegExp('\\$(\\d+\\.\\d\\d) USD');
  const amountMatch = body.match(amountRegex);

  const transactionRegex = /.Transaction ID.\n(.*?)$/m;
  const transactionMatch = body.match(transactionRegex);

  if (!amountMatch || !senderNameMatch || !transactionMatch) {
    console.log('failed to parse paypal payment', {
      amountMatch,
      senderNameMatch,
      transactionMatch,
    });
    return {
      success: false,
    };
  }
  const amount = Number(amountMatch[1]);
  const name = senderNameMatch[1];
  const transactionId = transactionMatch[1];

  const newPayment = await updateDatabase({
    amount,
    name,
    transactionId,
    email,
  });
  console.log('new payment', newPayment);
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
  });
}
