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

  submitNewCashappAccount: () => void;

  newCashtag: string;
  setNewCashtag: (newCashtag: string) => void;

  newCashappEmail: string;
  setNewCashappEmail: (newCashappEmail: string) => void;
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
        onSubmit={p.submitNewCashappAccount}
        cashtag={p.newCashtag}
        setCashtag={p.setNewCashtag}
        email={p.newCashappEmail}
        setEmail={p.setNewCashappEmail}
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
  const [newCashtag, setNewCashtag] = useState('');
  const [newCashappEmail, setNewCashappEmail] = useState('');

  const cashappAccounts: CashAppAccountType[] =
    data?.getAllAccounts.map((account) => {
      const cashappAccount: CashAppAccountType = {
        cashtag: account.email,
        balance: account.balance,
        lastUpdate: account.updatedAt ? new Date(account.updatedAt) : undefined,
      };
      return cashappAccount;
    }) ?? [];

  console.log('cashappAccounts', cashappAccounts);

  return (
    <AccountsCard
      cashappAccount={cashappAccounts}
      newCashtag={newCashtag}
      setNewCashtag={setNewCashtag}
      newCashappEmail={newCashappEmail}
      setNewCashappEmail={setNewCashappEmail}
      submitNewCashappAccount={() => {
        // TODO: Hookup
      }}
    />
  );
}
