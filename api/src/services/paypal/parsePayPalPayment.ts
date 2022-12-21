import { EmailObjectType } from '@/types';
import { PaymentRepository, EmailLogRepository } from '@/repositories';
import { getCustomRepository } from 'typeorm';
import { PaymentProvider, PaymentType } from '@/entities/Payment/Payment';
import { PaymentInfoType } from '@/types/paymentInfo';

export async function parsePayPalPayment(email: EmailObjectType) {
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
  const amount = Number(amountMatch[1]);
  const name = senderNameMatch[1];
  const transactionId = transactionMatch[1];

  await updateDatabase({
    amount,
    name,
    transactionId,
    email,
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
  const emailLogRepository = getCustomRepository(EmailLogRepository);
  await emailLogRepository.create(paymentInfo.email.id);

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
