import {
  PaymentTableData,
  PaymentProvider,
  Platform,
} from '@/features/admin-page/components/payments-table/PaymentsTable';

export const dummyPaymentInfo: PaymentTableData[] = [
  {
    paymentProvider: PaymentProvider.PAYPAL,
    username: 'test_user_1',
    amount: 100,
    platform: Platform.SLOTS,
    id: '1',
  },
  {
    paymentProvider: PaymentProvider.ZELLE,
    username: 'test_user_2',
    amount: 102,
    platform: Platform.POKER,
    id: '2',
  },
  {
    paymentProvider: PaymentProvider.CASHAPP,
    username: 'test_user_3',
    amount: 103,
    platform: Platform.SLOTS,
    id: '3',
  },
  {
    paymentProvider: PaymentProvider.PAYPAL,
    username: 'test_user_4',
    amount: 104,
    platform: Platform.POKER,
    id: '4',
  },
  {
    paymentProvider: PaymentProvider.ZELLE,
    username: 'test_user_5',
    amount: 105,
    platform: Platform.SLOTS,
    id: '5',
  },
  {
    paymentProvider: PaymentProvider.PAYPAL,
    username: 'test_user_6',
    amount: 106,
    platform: Platform.SLOTS,
    id: '6',
  },
  {
    paymentProvider: PaymentProvider.CASHAPP,
    username: 'test_user_7',
    amount: 107,
    platform: Platform.SLOTS,
    id: '7',
  },
  {
    paymentProvider: PaymentProvider.ZELLE,
    username: 'test_user_8',
    amount: 108,
    platform: Platform.SLOTS,
    id: '8',
  },
  {
    paymentProvider: PaymentProvider.CASHAPP,
    username: 'test_user_9',
    amount: 109,
    platform: Platform.POKER,
    id: '9',
  },
  {
    paymentProvider: PaymentProvider.ZELLE,
    username: 'test_user_10',
    amount: 105,
    platform: Platform.SLOTS,
    id: '10',
  },
];
