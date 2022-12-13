import { EmailObjectType } from '@/types';
import { Payment, User } from '@/entities';
import { getCustomRepository } from 'typeorm';
import { PaymentProvider, PaymentType } from '@/entities/Payment/Payment';
import { PaymentRepository } from '@/repositories';
import { PaymentInfoType } from '@/types/paymentInfo';

export async function parseZellePayment(email: EmailObjectType) {
  let { body } = email;
  body = body.replace(/\r/g, '');

  const senderNameRegex = /^(.*) sent you /m;
  const senderNameMatch = body.match(senderNameRegex);

  const amountRegex = new RegExp(/(?<=\$)\d+\.\d+/);
  const amountMatch = body.match(amountRegex);

  if (!amountMatch || !senderNameMatch) {
    console.log('failed to parse zelle payment', {
      amountMatch,
      senderNameMatch,
    });
    return {
      success: false,
    };
  }

  const name = senderNameMatch[1];
  const amount = Number(amountMatch[0]);

  await updateDatabase({
    amount,
    name,
    email,
  });

  return {
    success: true,
    name,
    amount,
  };
}

function updateDatabase(paymentInfo: PaymentInfoType) {
  const paymentRepository = getCustomRepository(PaymentRepository);
  return paymentRepository.createPayment({
    userIdentifier: paymentInfo.name,
    amount: paymentInfo.amount,
    emailId: paymentInfo.email.id,
    provider: PaymentProvider.ZELLE,
    senderName: paymentInfo.name,
    paymentType: PaymentType.DEPOSIT,
  });
}
