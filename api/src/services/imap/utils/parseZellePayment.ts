import { v4 as uuid } from 'uuid';
import { ParsedEmailPayload } from '@/types/parsed-email';

export function parseZellePayment(body: string): ParsedEmailPayload {
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
      data: null,
    };
  }

  const name = senderNameMatch[1];
  const amount = Number(amountMatch[0]);

  return {
    success: true,
    data: {
      name,
      amount,
      transactionId: uuid(),
    },
  };
}
