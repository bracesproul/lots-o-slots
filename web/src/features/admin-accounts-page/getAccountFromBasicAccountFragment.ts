import { PaymentProvider } from '@/generated/graphql';
import { Account } from './components/account-card/AccountCard';

type BasicAccountFragment = {
  __typename?: 'Account';
  id: string;
  email: string;
  balance: number;
  type: PaymentProvider;
  defaultAccount?: boolean | null;
  cashtag?: string | null;
  bitcoinAddress?: string | null;
  ethereumAddress?: string | null;
  name?: string | null;
};

export const getAccountFromBasicAccountFragment = (
  account: BasicAccountFragment
): Account => {
  const paymentProvider = account.type;
  const identifier =
    paymentProvider === PaymentProvider.CASHAPP
      ? account.cashtag
      : paymentProvider === PaymentProvider.BITCOIN
      ? account.bitcoinAddress
      : paymentProvider === PaymentProvider.ETHEREUM
      ? account.ethereumAddress
      : account.email;
  return {
    id: account.id,
    name: account.name ?? account.id.split('-')[0],
    identifier: identifier ?? '',
    balance: account.balance,
    paymentProvider,
    isDefault: !!account.defaultAccount,
  };
};
