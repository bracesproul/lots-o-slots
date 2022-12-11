import { EmailObjectType } from '@/types';
import { Payment, User } from '@/entities';
import { getCustomRepository } from 'typeorm';

export async function parseZellePayment(email: EmailObjectType) {
  const { body } = email;
  // we want to check it's not some random Zelle email.
  if (body.includes(' sent you $') && body.includes(' with Zelle')) {
    const amount = body
      .split('SENT AMOUNT BEFORE KEYWORD')[1]
      .split('SENT AFTER KEYWORD')[0];
    const sender = body
      .split('SENDER BEFORE KEYWORD')[0]
      .split('SENDER AFTER KEYWORD')[0];
    // await getCustomRepository(Payment).addNewPayment;
    // await getCustomRepository(User).updateBalance
  }
}
