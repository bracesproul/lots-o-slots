import { EmailObjectType } from '@/types';

export async function handleWithdrawal(email: EmailObjectType) {
  // implement this function
  return {
    success: true,
    amount: 10,
    name: null,
    transactionId: 'string',
    cashTag: null,
  };
}
