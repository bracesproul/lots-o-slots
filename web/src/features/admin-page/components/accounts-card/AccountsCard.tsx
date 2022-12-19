import { ReactElement, useState } from 'react';
import { AddCashappAccountForm, CashappAccountCard } from './components';
import { Button } from '@/components';
import { useGetAllAccountsQuery } from '@/generated/graphql';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Dialog from '@/components/modal/ModalNew';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [changeCashtagModalOpen, setChangeCashtagModalOpen] = useState(false);
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
        <Button className={`${PREFIX}-action-button`} type="button">
          Change Default CashTag
        </Button>
        <Button
          onPress={() => setChangeCashtagModalOpen(true)}
          className={`${PREFIX}-action-button`}
          variant="secondary"
          type="button"
        >
          Add CashApp Account
        </Button>
      </div>
      <Dialog
        open={changeCashtagModalOpen}
        onOpenChange={setChangeCashtagModalOpen}
        title="Add New CashApp Account"
        buttonTitle="Close"
      >
        <AddCashappAccountForm
          onSubmit={p.submitNewCashappAccount}
          cashtag={p.newCashtag}
          setCashtag={p.setNewCashtag}
          email={p.newCashappEmail}
          setEmail={p.setNewCashappEmail}
        />
      </Dialog>
    </div>
  );
}

export default function AccountsCardContainer(): ReactElement {
  const { data } = useGetAllAccountsQuery();
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
