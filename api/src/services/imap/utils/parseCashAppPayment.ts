import { CashAppPaymentEmailData } from '@/types';
import axios from 'axios';
import { ParsedEmailPayload } from '@/types/parsed-email';

export async function parseCashAppPayment(
  body: string
): Promise<ParsedEmailPayload> {
  body = body.replace(/\r/g, '');
  if (body.includes('https://cash.app/payments/')) {
    return getDataFromPaymentsUrl(body);
  }

  const cashtagRegex = new RegExp(/^Payment from \$([^\s]+)/m);
  const cashtagMatch = body.match(cashtagRegex);

  const amountRegex = new RegExp(/(?<=\$)\d+\.\d+/);
  const amountMatch = body.match(amountRegex);

  // const nameRegex = new RegExp(/From\s(.+)/);
  // const nameMatch = body.match(nameRegex);

  // const transactionIdRegex = new RegExp(/#([^\s]+)/); CO_POLIT BASED
  const transactionIdRegex = new RegExp(/#(\w+)/); // GPT
  const transactionIdMatch = body.match(transactionIdRegex);

  if (!cashtagMatch || !amountMatch || !transactionIdMatch) {
    console.log('failed to parse cashapp payment', {
      cashtagMatch,
      amountMatch,
      transactionIdMatch,
    });
    return {
      success: false,
      data: null,
    };
  }

  const amount = Number(amountMatch[0]);
  // const name = nameMatch[1];
  const transactionId = transactionIdMatch[1];
  const cashTag = cashtagMatch[1];

  return {
    success: true,
    data: {
      amount,
      name: cashTag,
      transactionId,
    },
  };
}

async function getDataFromPaymentsUrl(
  body: string
): Promise<ParsedEmailPayload> {
  const data = {
    success: false,
    data: null,
  };
  try {
    console.log('ℹ️GETTING CASHAPP EMAIL FROM PAYMENTS URLℹ️');
    const newUrl = body.split('receipt, visit: ')[1];

    const config = {
      method: 'get',
      url: newUrl,
      headers: {
        'Content-Type': 'text/plain',
      },
    };

    const { data } = await axios(config);

    const dataFromStringSplit =
      data.split('{paymentHistoryData:')[1].split('} };')[0] + '}';
    const cashappData: CashAppPaymentEmailData =
      JSON.parse(dataFromStringSplit);
    const detailRowValues = cashappData.detail_rows.map((row) => row.value);
    const amount = Number(detailRowValues[0].split('$')[1]);
    // const name = detailRowValues[4];
    const transactionId = cashappData.transaction_id;
    const cashTag = cashappData.header_subtext.split('$')[1];
    data.success = true;
    data.data = {
      amount,
      name: cashTag,
      transactionId,
    };
  } catch (error) {
    console.error('error fetching cashapp payment from payments url');
  }
  return data;
}
