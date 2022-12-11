import { gmail_v1 } from 'googleapis';

export function parseEmailBody(parts: gmail_v1.Schema$MessagePart[]): string {
  let body = '';
  parts?.forEach((part) => {
    if (part.mimeType === 'text/html' && part?.body?.data) {
      body = Buffer.from(part.body?.data, 'base64').toString('utf-8');
    }
  });
  return body;
}
