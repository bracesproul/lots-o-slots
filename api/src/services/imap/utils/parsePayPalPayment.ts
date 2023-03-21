import { ParsedEmailPayload } from '@/types/parsed-email';

export function parsePayPalPayment(body: string): ParsedEmailPayload {
  body = body.replace(/\r/g, '');
  const senderNameRegex = new RegExp(/(?<=\s)[^\n]+(?= sent you)/);
  const senderNameMatch = body.match(senderNameRegex)?.[0];

  // const amountRegex = new RegExp('\\$(\\d+\\.\\d\\d) USD');
  const amountRegex = new RegExp(/[$]\d+(\.\d+)?/);
  let amountMatch = body.match(amountRegex)?.[0];

  const transactionRegex = new RegExp(/\b[A-Z0-9]{17}\b/);
  const transactionMatch = body.match(transactionRegex)?.[0];

  if (!amountMatch || !senderNameMatch || !transactionMatch) {
    console.log('failed to parse paypal payment', {
      amountMatch,
      senderNameMatch,
      transactionMatch,
    });
    return {
      success: false,
      data: null,
    };
  }
  amountMatch = amountMatch.replace('$', '');
  const amount = Number(amountMatch);
  const name = senderNameMatch;
  const transactionId = transactionMatch;

  return {
    success: true,
    data: {
      amount,
      name,
      transactionId,
    },
  };
}
