import { gmail_v1 } from 'googleapis';
import axios from 'axios';

// eslint-disable-next-line
const REGEX_URL = '\bhttps?:\/\/\S+';

export async function parseEmailBody(
  parts: gmail_v1.Schema$MessagePart[]
): Promise<string> {
  let body = '';

  await Promise.all(
    parts?.map(async (part) => {
      if (part.mimeType === 'text/plain' && part?.body?.data) {
        body = Buffer.from(part.body?.data, 'base64').toString('utf-8');
        try {
          const url = body.match(REGEX_URL);
          console.log('EXTRACTED URL', url);

          const axiosConfig = {
            method: 'get',
            url: url?.[0],
            headers: {
              'Content-Type': 'text/plain',
            },
          };

          const { data } = await axios(axiosConfig);
          console.log('plain text axios res', data);
        } catch (error) {
          console.error('error trying to fetch receipt url', error);
        }
      }
    })
  );

  return body;
}
