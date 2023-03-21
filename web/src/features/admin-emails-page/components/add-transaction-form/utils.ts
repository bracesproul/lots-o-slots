import { PaymentStatus, PaymentType } from '@/generated/graphql';
import { PaymentProvider } from '@/types';

export const PAYMENT_OPTIONS = [
  { name: 'PayPal', value: PaymentProvider.PAYPAL },
  { name: 'CashApp', value: PaymentProvider.CASHAPP },
  { name: 'Zelle', value: PaymentProvider.ZELLE },
  { name: 'Bitcoin', value: PaymentProvider.BITCOIN },
  { name: 'Ethereum', value: PaymentProvider.ETHEREUM },
];

export const getPaymentProviderFromString = (
  paymentType: string
): PaymentProvider => {
  switch (paymentType.toLowerCase()) {
    case 'zelle':
      return PaymentProvider.ZELLE;
    case 'paypal':
      return PaymentProvider.PAYPAL;
    case 'cashapp':
      return PaymentProvider.CASHAPP;
    case 'bitcoin':
      return PaymentProvider.BITCOIN;
    case 'ethereum':
      return PaymentProvider.ETHEREUM;
    default:
      return PaymentProvider.PAYPAL;
  }
};

export const STATUS_OPTIONS = [
  { name: 'Pending', value: PaymentStatus.PENDING },
  { name: 'Completed', value: PaymentStatus.COMPLETED },
  { name: 'Failed', value: PaymentStatus.FAILED },
];

export const TYPE_OPTIONS = [
  { name: 'Deposit', value: PaymentType.DEPOSIT },
  { name: 'Withdrawal', value: PaymentType.WITHDRAWAL },
  { name: 'Payout', value: PaymentType.PAYOUT },
];

export const getTransactionStatusFromString = (
  paymentType: string
): PaymentStatus => {
  switch (paymentType.toLowerCase()) {
    case 'pending':
      return PaymentStatus.PENDING;
    case 'completed':
      return PaymentStatus.COMPLETED;
    case 'failed':
      return PaymentStatus.FAILED;
    default:
      return PaymentStatus.PENDING;
  }
};

export const getTransactionTypeFromString = (
  paymentType: string
): PaymentType => {
  switch (paymentType.toLowerCase()) {
    case 'deposit':
      return PaymentType.DEPOSIT;
    case 'withdrawal':
      return PaymentType.WITHDRAWAL;
    case 'payout':
      return PaymentType.PAYOUT;
    default:
      return PaymentType.DEPOSIT;
  }
};
