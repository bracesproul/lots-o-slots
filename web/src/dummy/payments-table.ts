import { PaymentTableData } from '@/features/admin-page/components/payments-table/PaymentsTable';
import { PaymentProvider } from '@/generated/graphql';

export const dummyPaymentInfo: PaymentTableData[] = [
  {
    paymentProvider: PaymentProvider.PAYPAL,
    username: 'test_user_1',
    name: 'Test User 1',
    amount: 100,
    id: '1',
  },
  {
    paymentProvider: PaymentProvider.ZELLE,
    username: 'test_user_2',
    name: 'Test User 2',
    amount: 102,
    id: '2',
  },
  {
    paymentProvider: PaymentProvider.CASHAPP,
    username: 'test_user_3',
    name: 'Test User 3',
    amount: 103,
    id: '3',
  },
  {
    paymentProvider: PaymentProvider.PAYPAL,
    username: 'test_user_4',
    name: 'Test User 4',
    amount: 104,
    id: '4',
  },
  {
    paymentProvider: PaymentProvider.ZELLE,
    username: 'test_user_5',
    name: 'Test User 5',
    amount: 105,
    id: '5',
  },
  {
    paymentProvider: PaymentProvider.PAYPAL,
    username: 'test_user_6',
    name: 'Test User 6',
    amount: 106,
    id: '6',
  },
  {
    paymentProvider: PaymentProvider.CASHAPP,
    username: 'test_user_7',
    name: 'Test User 7',
    amount: 107,
    id: '7',
  },
  {
    paymentProvider: PaymentProvider.CASHAPP,
    username: 'test_user_7',
    name: 'Test User 7',
    amount: 107,
    id: '8',
  },
];
