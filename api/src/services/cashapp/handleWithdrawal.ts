import { CashappSnippedData, EmailObjectType } from '@/types';
import { getCustomRepository } from 'typeorm';
import { AccountRepository } from '@/repositories';
import { EmailLogType } from '@/entities/EmailLog/EmailLog';
import { logEmail } from '@/utils';

export async function handleWithdrawal(
  email: EmailObjectType,
  snippetData?: CashappSnippedData | null
) {
  const accountRepository = getCustomRepository(AccountRepository);
  const account = await accountRepository.findOne(
    email.originalSenderEmail ?? email.to
  );

  if (!account) {
    console.warn('Cashapp account does not exist', {
      to: email.to,
      originalSenderEmail: email.originalSenderEmail,
    });
    return {
      success: false,
      amount: 0,
      name: null,
      cashTag: null,
      transactionId: '',
    };
  }

  if (snippetData) {
    accountRepository.debitAccountBalance({
      id: account.id,
      amount: Number(snippetData.amount),
    });

    await logEmail({
      email,
      description: 'Logged CashApp withdrawal',
      type: EmailLogType.CASHAPP,
      processed: true,
    });

    return {
      success: true,
      amount: Number(snippetData.amount),
      name: null,
      transactionId: email.id,
      cashTag: account.cashtag ?? null,
    };
  }

  const body = email.body.replace(/\r/g, '');

  const amountRegex = new RegExp(/Market Purchase Order\n\$([\d,.]+\.\d\d)/);
  const amountMatch = body.match(amountRegex);

  if (!amountMatch) {
    console.log('failed to parse get cashapp bitcoin payment', amountMatch);
    return {
      success: false,
      amount: 0,
      name: null,
      cashTag: null,
      transactionId: '',
    };
  }

  const amount = Number(amountMatch[1].replace(/,/g, ''));

  accountRepository.debitAccountBalance({
    id: account.id,
    amount: amount,
  });

  await logEmail({
    email,
    description: 'Logged CashApp withdrawal',
    type: EmailLogType.CASHAPP,
    processed: true,
  });

  return {
    amount,
    success: true,
    name: null,
    transactionId: email.id,
    cashTag: account.cashtag ?? null,
  };
}
