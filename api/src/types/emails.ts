export type EmailObjectType = {
  to: string;
  from: string;
  subject: string;
  body: string;
  id: string;
  originalSenderEmail?: string;
};
export const BANK_OF_AMERICA_EMAIL =
  'customerservice@ealerts.bankofamerica.com';
export const CASHAPP_EMAIL = 'cash@square.com';
export const PAYPAL_EMAIL = 'service@paypal.com';

export enum ProviderEmail {
  BANK_OF_AMERICA = 'customerservice@ealerts.bankofamerica.com',
  CASHAPP = 'cash@square.com',
  PAYPAL = 'service@paypal.com',
}

export const BANK_OF_AMERICA_DEPOSITS_SUBJECT = ' sent you $';
export const CASHAPP_DEPOSITS_SUBJECT = ' sent you $';
export const CASHAPP_WITHDRAWALS_SUBJECT = 'You paid ';
export const PAYPAL_DEPOSITS_SUBJECT = `You've got money`;
