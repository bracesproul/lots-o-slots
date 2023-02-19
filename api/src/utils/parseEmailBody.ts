import { gmail_v1 } from 'googleapis';
import axios from 'axios';
import {
  CashAppPaymentEmailData,
  CashappSnippedData,
  PayPalDecodedData,
  ZelleSnippetData,
} from '@/types';
import { stripHtml } from 'string-strip-html';

// eslint-disable-next-line
const REGEX_URL = /(https:\/\/.*\/receipt)/;

const CASHAPP_EMAIL = 'cash@square.com';
const CASHAPP_WITHDRAWALS_SUBJECT = 'You paid ';

const ZELLE_EMAIL = 'customerservice@ealerts.bankofamerica.com';
const ZELLE_PAYMENT_SUBJECT = 'sent you $';

const PAYPAL_EMAIL = 'service@paypal.com';
const PAYPAL_PAYMENT_SUBJECT = `You've got money`;

type ParseEmailBodyPayload = {
  body: string;
  cashappData?: CashAppPaymentEmailData | null;
  snippetData?: CashappSnippedData | null;
  zelleSnippetData?: ZelleSnippetData | null;
  paypalData?: PayPalDecodedData | null;
};

export async function parseEmailBody(
  parts: gmail_v1.Schema$MessagePart[],
  emailSnippet: string,
  from: string,
  subject: string,
  payload?: gmail_v1.Schema$MessagePart
): Promise<ParseEmailBodyPayload> {
  let body = '';
  let cashappData: CashAppPaymentEmailData | null = null;

  // Pulls cashapp withdrawal data from email snippet
  if (subject.includes(CASHAPP_WITHDRAWALS_SUBJECT) && from === CASHAPP_EMAIL) {
    return parseCashappWithdrawalSnippet(emailSnippet);
  }

  if (subject.includes(ZELLE_PAYMENT_SUBJECT) && from === ZELLE_EMAIL) {
    return parseZellePaymentSnippet(emailSnippet);
  }

  if (from === PAYPAL_EMAIL && subject === PAYPAL_PAYMENT_SUBJECT) {
    return parsePaypalPaymentBody(payload);
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

function parseZellePaymentSnippet(snippet: string): ParseEmailBodyPayload {
  const amount = snippet.match(/\$\d+\.\d{2}/)?.[0].split('$')[1];
  const senderName = snippet.match(/^(.+?)\ssent\syou/)?.[1];

  return {
    body: '',
    cashappData: null,
    snippetData: null,
    zelleSnippetData: {
      senderName,
      amount,
    },
  };
}

function parsePaypalPaymentBody(
  payload?: gmail_v1.Schema$MessagePart
): ParseEmailBodyPayload {
  if (!payload) {
    return {
      body: '',
      cashappData: null,
      snippetData: null,
      paypalData: null,
    };
  }

  const { body } = payload;

  if (!body?.data) {
    return {
      body: '',
      cashappData: null,
      snippetData: null,
      paypalData: null,
    };
  }

  const decodedBody = Buffer.from(body?.data, 'base64').toString('utf-8');

  const strippedBody = stripHtml(decodedBody).result;

  const transactionIdPattern = /Transaction ID (\w+)/;
  const transactionIdMatch = strippedBody.match(transactionIdPattern);
  const transactionId = transactionIdMatch ? transactionIdMatch[1] : undefined;

  const customerNamePattern = /Note from ([\w\s]+):/;
  const customerNameMatch = strippedBody.match(customerNamePattern);
  const customerName = customerNameMatch ? customerNameMatch[1] : undefined;

  const amountPattern = /sent you \$(\d+\.\d{2})/;
  const amountMatch = strippedBody.match(amountPattern);
  const amount = amountMatch ? amountMatch[1] : undefined;

  return {
    body: '',
    cashappData: null,
    snippetData: null,
    paypalData: {
      transactionId,
      customerName,
      amount,
    },
  };
}
