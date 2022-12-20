import { ReactElement, useState } from 'react';
import {
  AddCashappAccountForm,
  CashappAccountCard,
  ChangePaymentHandleDialog,
} from './components';
import { Button } from '@/components';
import { PaymentProvider, useGetAccountsQuery } from '@/generated/graphql';

type CashAppAccountType = {
  cashtag: string;
  balance: number;
  lastUpdate?: Date;
};

export type AccountsCardProps = {
  cashappAccount: CashAppAccountType[];
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
      />
      <ChangePaymentHandleDialog
        open={changeCashtagModalOpen}
        setOpen={setChangeCashtagModalOpen}
      />
    </div>
  );
}

export default function AccountsCardContainer(): ReactElement {
  const { data } = useGetAccountsQuery({
    variables: {
      input: {
        provider: PaymentProvider.CASHAPP,
      },
    },
  });

  const cashappAccounts: CashAppAccountType[] =
    data?.getAllAccounts.map((account) => {
      const cashappAccount: CashAppAccountType = {
        cashtag: account.email,
        balance: account.balance,
        lastUpdate: account.updatedAt ? new Date(account.updatedAt) : undefined,
      };
      return cashappAccount;
    }) ?? [];

  return <AccountsCard cashappAccount={cashappAccounts} />;
}
