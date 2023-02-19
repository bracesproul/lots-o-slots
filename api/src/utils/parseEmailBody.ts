import { gmail_v1 } from 'googleapis';
import axios from 'axios';
import { CashAppPaymentEmailData, CashappSnippedData } from '@/types';

// eslint-disable-next-line
const REGEX_URL = /(https:\/\/.*\/receipt)/;

const CASHAPP_EMAIL = 'cash@square.com';
const CASHAPP_WITHDRAWALS_SUBJECT = 'You paid ';

type ParseEmailBodyPayload = {
  body: string;
  cashappData?: CashAppPaymentEmailData | null;
  snippetData?: CashappSnippedData | null;
};

export async function parseEmailBody(
  parts: gmail_v1.Schema$MessagePart[],
  emailSnippet: string,
  from: string,
  subject: string
): Promise<ParseEmailBodyPayload> {
  let body = '';
  let cashappData: CashAppPaymentEmailData | null = null;

  // Pulls cashapp withdrawal data from email snippet
  if (subject.includes(CASHAPP_WITHDRAWALS_SUBJECT) && from === CASHAPP_EMAIL) {
    return parseCashappWithdrawalSnippet(emailSnippet);
  }

  await Promise.all(
    parts?.map(async (part) => {
      if (part.mimeType === 'text/plain' && part?.body?.data) {
        body = Buffer.from(part.body?.data, 'base64').toString('utf-8');

        if (body.includes('https://cash.app/payments/')) {
          try {
            const newUrl = body.split('receipt, visit: ')[1];
            // const url = body.match(REGEX_URL);

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
            cashappData = JSON.parse(dataFromStringSplit);
          } catch (error) {
            console.error('error trying to fetch receipt url', error);
          }
        }
      } else if (part?.body?.data) {
        body = Buffer.from(part.body?.data, 'base64').toString('utf-8');
      }
    })
  );

  return {
    body,
    cashappData,
  };
}

function parseCashappWithdrawalSnippet(snippet: string): ParseEmailBodyPayload {
  const cashtag = snippet.match(/to \$(.*?) /i)?.[1];
  const amount = snippet.match(/Amount \$(.*?) /i)?.[1];
  const paymentId = snippet.match(/Identifier #(.*?) /i)?.[1];
  const receiverName = snippet.match(/To (\w+ \w+)/i)?.[1];

  return {
    body: '',
    cashappData: null,
    snippetData: {
      cashtag,
      amount,
      paymentId,
      receiverName,
    },
  };
}
