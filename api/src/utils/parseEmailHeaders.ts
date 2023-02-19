import { gmail_v1 } from 'googleapis';
import { EmailObjectType } from '@/types';

export function parseEmailHeaders(
  headers: gmail_v1.Schema$MessagePartHeader[]
): Omit<EmailObjectType, 'body' | 'id'> {
  const schemaTo = headers?.find(
    (header) => header.name === 'Delivered-To' && header.value
  );
  const to = schemaTo?.value;

  const schemaFrom = headers?.find(
    (header) => header.name === 'From' && header.value
  );
  const from = schemaFrom?.value?.split('<')[1].split('>')[0];

  const originalSenderFrom = headers?.find(
    (header) => header.name === 'Return-Path' && header.value
  );
  const originalSenderEmail =
    originalSenderFrom?.value?.split('<')[1].split('+caf_=')[0] + '@gmail.com';

  const schemaSubject = headers?.find(
    (header) => header.name === 'Subject' && header.value
  );
  const subject = schemaSubject?.value;
  if (!to || !from || !subject) {
    console.error('NO EMAIL HEADERS');
    return {
      to: '',
      from: '',
      subject: '',
      originalSenderEmail: '',
    };
  }
  return { to, from, subject, originalSenderEmail };
}
