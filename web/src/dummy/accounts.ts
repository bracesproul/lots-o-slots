import { PaymentProvider } from '@/types';

export const dummyAccounts = [
  {
    id: '1',
    name: 'CA Acc one',
    identifier: '$cashtag',
    balance: 1000,
    paymentProvider: PaymentProvider.CASHAPP,
    isDefault: true,
  },
  {
    id: '2',
    name: 'CA Acc two',
    identifier: '$cashtag_two',
    balance: 10222,
    paymentProvider: PaymentProvider.CASHAPP,
    isDefault: false,
  },
  {
    id: '3',
    name: 'CA Acc three',
    identifier: '$cashtag_three',
    balance: 872,
    paymentProvider: PaymentProvider.CASHAPP,
    isDefault: false,
  },
  {
    id: '4',
    name: 'CA Acc four',
    identifier: '$cashtag_four',
    balance: 552,
    paymentProvider: PaymentProvider.CASHAPP,
    isDefault: false,
  },
];
