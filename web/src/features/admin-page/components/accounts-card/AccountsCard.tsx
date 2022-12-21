import { ReactElement, useState } from 'react';
import {
  AddCashappAccountForm,
  CashappAccountCard,
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
} from '@/generated/graphql';
import { ApolloQueryResult } from '@apollo/client';

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
      </div>
      <div className={`${PREFIX}-button-container`}>
        <Button
          className={`${PREFIX}-action-button`}
          type="button"
          onPress={() => setChangeCashtagModalOpen(true)}
        >
          Change Default CashTag
        </Button>
        <Button
          onPress={() => setAddCashappAccountOpen(true)}
          className={`${PREFIX}-action-button`}
          variant="secondary"
          type="button"
        >
          Add CashApp Account
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

  const cashappAccounts: CashAppAccountType[] =
    data?.getAllAccounts.map((account) => {
      const cashappAccount: CashAppAccountType = {
        cashtag: account.cashtag ?? '',
        balance: account.balance,
        lastUpdate: account.updatedAt ? new Date(account.updatedAt) : undefined,
      };
      return cashappAccount;
    }) ?? [];

  return <AccountsCard refetch={refetch} cashappAccount={cashappAccounts} />;
}
