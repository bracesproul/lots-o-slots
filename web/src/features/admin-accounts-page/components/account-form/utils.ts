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
