import { PaymentProvider } from '@/generated/graphql';

export const getPaymentProviderFromString = (provider: string) => {
  switch (provider) {
    case 'CashApp':
      return PaymentProvider.CASHAPP;
    case 'Zelle':
      return PaymentProvider.ZELLE;
    case 'PayPal':
      return PaymentProvider.PAYPAL;
    case 'Bitcoin':
      return PaymentProvider.BITCOIN;
    case 'Ethereum':
      return PaymentProvider.ETHEREUM;
    default:
      throw new Error('No payment provider found from the provided input.');
  }
};

export const getStringFromPaymentProvider = (string: PaymentProvider) => {
  switch (string) {
    case PaymentProvider.CASHAPP:
      return 'CashApp';
    case PaymentProvider.ZELLE:
      return 'Zelle';
    case PaymentProvider.PAYPAL:
      return 'PayPal';
    case PaymentProvider.BITCOIN:
      return 'Bitcoin';
    case PaymentProvider.ETHEREUM:
      return 'Ethereum';
    default:
      throw new Error('No payment provider found from the provided input.');
  }
};

export const paymentProviderOptions = [
  {
    value: 'CashApp',
    name: 'CashApp',
  },
  {
    value: 'Zelle',
    name: 'Zelle',
  },
  {
    value: 'PayPal',
    name: 'PayPal',
  },
  {
    value: 'Bitcoin',
    name: 'Bitcoin',
  },
  {
    value: 'Ethereum',
    name: 'Ethereum',
  },
];
