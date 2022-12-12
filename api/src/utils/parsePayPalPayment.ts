import { EmailObjectType } from '@/types';
import { Payment, User } from '@/entities';
import { getCustomRepository } from 'typeorm';
import fs from 'fs/promises';

export async function parsePayPalPayment(email: EmailObjectType) {
  const { body } = email;
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
  return {
    success: true,
    amount,
    name,
    transactionId,
  };
}
