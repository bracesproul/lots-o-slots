import { EmailObjectType } from '@/types';
import { getCustomRepository } from 'typeorm';
import { AccountRepository, EmailLogRepository } from '@/repositories';
import { EmailLogType } from '@/entities/EmailLog/EmailLog';
import { logEmail } from '@/utils';

export async function handleWithdrawal(email: EmailObjectType) {
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
  } else {
    console.log('amount', amountMatch);
  }

  const amount = Number(amountMatch[1].replace(/,/g, ''));

  const accountRepository = getCustomRepository(AccountRepository);
  const account = await accountRepository.findOne(email.to);

  if (!account) {
    console.log('account does not exist', email.to);
    return {
      success: false,
      amount: 0,
      name: null,
      cashTag: null,
      transactionId: '',
    };
  }

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
    success: true,
    amount: 10,
    name: null,
    transactionId: email.id,
    cashTag: account.cashtag ?? null,
  };
}

const emailBody = `
Bitcoin
Market Purchase Order
$2,027.00

Dec 2 at 1:28 PM
Completed
Bitcoin Amount
0.11813959 BTC
Exchange Rate
$16,942.33
Total Purchase Amount
$2,001.56
Fee
$25.44
Total
$2,027.00`;
