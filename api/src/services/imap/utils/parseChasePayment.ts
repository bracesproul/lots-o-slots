import { v4 as uuid } from 'uuid';
import { ParsedEmailPayload } from '@/types/parsed-email';

export function parseChasePayment(body: string): ParsedEmailPayload {
  body = body.replace(/\r/g, '');

  const nameRegex = /(.+?) sent you money/;
  const nameMatch = body.match(nameRegex);

  const amountRegex = /unt: \$(.*?) \(/;
  const amountMatch = body.match(amountRegex);

  if (!amountMatch || !nameMatch) {
    console.log('failed to parse chase payment', {
      amountMatch,
      nameMatch,
    });
    return {
      success: false,
      data: null,
    };
  }

  const name = nameMatch[1];
  const amount = Number(amountMatch[1]);

  return {
    success: true,
    data: {
      name,
      amount,
      transactionId: uuid(),
    },
  };
}
