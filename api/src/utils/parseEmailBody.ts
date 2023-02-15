import { gmail_v1 } from 'googleapis';
import axios from 'axios';
import { CashAppPaymentEmailData } from '@/types';

// eslint-disable-next-line
const REGEX_URL = /(https:\/\/.*\/receipt)/;

type ParseEmailBodyPayload = {
  body: string;
  cashappData?: CashAppPaymentEmailData | null;
};

export async function parseEmailBody(
  parts: gmail_v1.Schema$MessagePart[]
): Promise<ParseEmailBodyPayload> {
  let body = '';
  let cashappData: CashAppPaymentEmailData | null = null;

  await Promise.all(
    parts?.map(async (part) => {
      if (part.mimeType === 'text/plain' && part?.body?.data) {
        body = Buffer.from(part.body?.data, 'base64').toString('utf-8');

        if (body.includes('https://cash.app/payments/')) {
          try {
            const newUrl = body.split('receipt, visit: ')[1];
            const url = body.match(REGEX_URL);
            console.log({
              regexUrl: url,
              splitUrl: newUrl,
            });

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
      }
    })
  );

  return {
    body,
    cashappData,
  };
}
