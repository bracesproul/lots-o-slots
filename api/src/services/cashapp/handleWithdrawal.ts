import { EmailObjectType } from '@/types';
import { getCustomRepository } from 'typeorm';
import { updateDatabasePayment } from '../';
import { EmailLogRepository } from '@/repositories';

export async function handleWithdrawal(email: EmailObjectType) {
  const body = email.body.replace(/\r/g, '');

  // amount should come from the total after fees
  const amountRegex = new RegExp(/Market Purchase Order\n\$([\d,.]+\.\d\d)/);
  const amountMatch = body.match(amountRegex);

  // name is `Bitcoin` because it has no sender name.
  const nameMatch = 'Bitcoin';

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
  const name = nameMatch[1];
  const transactionId = email.id;
  const cashTag = email.to;
  console.log('amount', amount);

  // const emailLogRepository = getCustomRepository(EmailLogRepository);
  // await emailLogRepository.create(email.id);

  // await updateDatabasePayment({
  //   amount,
  //   name,
  //   transactionId,
  //   cashTag,
  //   email,
  // });

  return {
    success: true,
    amount: 10,
    name: null,
    transactionId: 'string',
    cashTag: null,
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
