import { ReactElement, useState } from 'react';
import {
  AddCashappAccountForm,
  CashappAccountCard,
  OtherAccountCard,
  ChangePaymentHandleDialog,
} from './components';
import { Button } from '@/components';
import {
  Exact,
  GetAccountsQuery,
  GetAllAccountsInput,
  InputMaybe,
  PaymentProvider,
  useGetAccountsQuery,
  useGetAllAccountsQuery,
} from '@/generated/graphql';
import { ApolloQueryResult } from '@apollo/client';
import { OtherAccountCardProps } from './components/other-account-card/OtherAccountCard';

const getEmailOrAddress = ({
  email,
  bitcoinAddress,
  ethereumAddress,
}: {
  email: string | null;
  bitcoinAddress: string | null;
  ethereumAddress: string | null;
}) => {
  if (email) return email;
  if (bitcoinAddress) return bitcoinAddress;
  if (ethereumAddress) return ethereumAddress;
  return '';
};

type CashAppAccountType = {
  cashtag: string;
  balance: number;
  lastUpdate?: Date;
};

export type RefetchAccountInputType =
  | Partial<
      Exact<{
        input?: InputMaybe<GetAllAccountsInput> | undefined;
      }>
    >
  | undefined;

export type RefetchAccountReturnType = Promise<
  ApolloQueryResult<GetAccountsQuery>
>;

export type AccountsCardProps = {
  cashappAccount: CashAppAccountType[];
  otherAccounts: OtherAccountCardProps[];
  refetch: (variables: RefetchAccountInputType) => RefetchAccountReturnType;
};

const PREFIX = 'accounts-card';

export function AccountsCard(props: AccountsCardProps): ReactElement {
  const p = { ...props };
  const [changeCashtagModalOpen, setChangeCashtagModalOpen] = useState(false);
  const [addCashappAccountOpen, setAddCashappAccountOpen] = useState(false);
  return (
    <div className={`${PREFIX}`}>
      <h1 className={`${PREFIX}-header`}>Accounts & Balances</h1>
      <div className={`${PREFIX}-cards-container`}>
        {p.cashappAccount.map((account) => (
          <CashappAccountCard
            key={account.cashtag}
            cashtag={account.cashtag}
            balance={account.balance}
            lastUpdate={account.lastUpdate}
          />
        ))}
        {p.otherAccounts.map((account) => (
          <OtherAccountCard
            key={account.emailOrAddress}
            emailOrAddress={account.emailOrAddress}
            paymentProvider={account.paymentProvider}
            lastUpdate={account.lastUpdate}
          />
        ))}
      </div>
      <div className={`${PREFIX}-button-container`}>
        <Button
          className={`${PREFIX}-action-button`}
          type="button"
          onPress={() => setChangeCashtagModalOpen(true)}
        >
          Change Default Account
        </Button>
        <Button
          onPress={() => setAddCashappAccountOpen(true)}
          className={`${PREFIX}-action-button`}
          variant="secondary"
          type="button"
        >
          Add Account
        </Button>
      </div>
      <AddCashappAccountForm
        open={addCashappAccountOpen}
        setOpen={setAddCashappAccountOpen}
        refetch={p.refetch}
      />
      <ChangePaymentHandleDialog
        open={changeCashtagModalOpen}
        setOpen={setChangeCashtagModalOpen}
      />
    </div>
  );
}

export default function AccountsCardContainer(): ReactElement {
  const { data, refetch } = useGetAccountsQuery({
    variables: {
      input: {
        provider: PaymentProvider.CASHAPP,
      },
    },
  });

  const { data: allAccountsData } = useGetAllAccountsQuery();

  const cashappAccounts: CashAppAccountType[] =
    data?.getAllAccounts.map((account) => {
      const cashappAccount: CashAppAccountType = {
        cashtag: account.cashtag ?? '',
        balance: account.balance,
        lastUpdate: account.updatedAt ? new Date(account.updatedAt) : undefined,
      };
      return cashappAccount;
    }) ?? [];

  const otherAccounts: OtherAccountCardProps[] = [];
  allAccountsData?.getAllAccounts.forEach((account) => {
    if (account.type === PaymentProvider.CASHAPP) {
      return;
    }
    otherAccounts.push({
      paymentProvider: account.type,
      emailOrAddress: getEmailOrAddress({
        email: account.email ?? null,
        bitcoinAddress: account.bitcoinAddress ?? null,
        ethereumAddress: account.ethereumAddress ?? null,
      }),
      lastUpdate: account.updatedAt ? new Date(account.updatedAt) : undefined,
    });
  }) ?? [];

  return (
    <AccountsCard
      refetch={refetch}
      cashappAccount={cashappAccounts}
      otherAccounts={otherAccounts}
    />
  );
}
