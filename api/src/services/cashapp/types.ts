import { Payment, Account } from '@/entities';

export type UpdatePaymentAndAccountResponse = {
  success: boolean;
  payment: Payment;
  account: Account;
};
