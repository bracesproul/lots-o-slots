export type EmailObjectType = {
  to: string;
  from: string;
  subject: string;
  body: string;
  id: string;
  originalSenderEmail?: string;
};
