import { EmailObjectType } from './emails';

export type PaymentInfoType = {
  amount: number;
  name: string;
  transactionId?: string;
  cashTag?: string;
  email: EmailObjectType;
};
