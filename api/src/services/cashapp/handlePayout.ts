import { EmailObjectType } from '@/types';

export async function handlePayout(email: EmailObjectType) {
  const body = email.body.replace(/\r/g, '');

  const cashtagRegex = new RegExp(/^Payment to \$([^\s]+)/m);
  const cashtagMatch = body.match(cashtagRegex);

  const amountRegex = new RegExp(/(?<=\$)\d+\.\d+/);
  const amountMatch = body.match(amountRegex);

  const nameRegex = new RegExp(/To\s(.+)/);
  const nameMatch = body.match(nameRegex);

  const transactionIdRegex = new RegExp(/#([^\s]+)\sTo/);
  const transactionIdMatch = body.match(transactionIdRegex);

  if (!cashtagMatch || !amountMatch || !nameMatch || !transactionIdMatch) {
    console.log('failed to parse cashapp payout', {
      cashtagMatch,
      amountMatch,
      nameMatch,
      transactionIdMatch,
    });
    return {
      success: false,
      amount: 0,
      name: null,
      cashTag: null,
      transactionId: '',
    };
  }

  const amount = Number(amountMatch[0]);
  const name = nameMatch[1];
  const transactionId = transactionIdMatch[1];
  const cashTag = cashtagMatch[1];

  return {
    success: true,
    amount,
    name,
    transactionId,
    cashTag,
  };
}
