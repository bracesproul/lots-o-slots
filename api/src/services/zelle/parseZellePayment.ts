import { EmailObjectType, ZelleSnippetData } from '@/types';
import { getCustomRepository } from 'typeorm';
import { PaymentProvider } from '@/entities/Payment/Payment';
import { PaymentRepository, EmailLogRepository } from '@/repositories';
import { PaymentInfoType } from '@/types/paymentInfo';
import { logEmail } from '@/utils';
import { EmailLogType } from '@/entities/EmailLog/EmailLog';
import { PaymentType } from '@/entities/Transaction/types';

export async function parseZellePayment(
  email: EmailObjectType,
  zelleSnippetData?: ZelleSnippetData | null
) {
  if (zelleSnippetData) {
    await updateDatabase({
      amount: Number(zelleSnippetData.amount),
      name: zelleSnippetData.senderName ?? '',
      email,
    });

    await logEmail({
      email,
      description: 'Logged Zelle payment',
      type: EmailLogType.ZELLE,
      processed: true,
    });

    return {
      success: true,
      amount: Number(zelleSnippetData.amount),
      name: zelleSnippetData.senderName ?? '',
    };
  }

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

  await logEmail({
    email,
    description: 'Logged Zelle payment',
    type: EmailLogType.ZELLE,
    processed: true,
  });

  return {
    success: true,
    name,
    amount,
  };
}

async function updateDatabase(paymentInfo: PaymentInfoType) {
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
