import { ReactElement, useState } from 'react';
import { CashappAccountCard } from './components';
import { Button, Modal } from '@/components';
import Dialog from '@/components/modal/ModalNew';

type CashAppAccountType = {
  cashtag: string;
  balance: number;
  lastUpdate: Date;
};

export type AccountsCardProps = {
  cashappAccount: CashAppAccountType[];
};

const PREFIX = 'accounts-card';

export default function AccountsCard(props: AccountsCardProps): ReactElement {
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
      {/* <Dialog
        open={changeCashtagModalOpen}
        onOpenChange={setChangeCashtagModalOpen}
      >
        <Dialog.Content>
          <Dialog.Title title="Add CashApp Account" />
          <Dialog.Description description="Please enter the details of the account you would like to add" />
          <Dialog.Footer>
            <Button type="submit">Save</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog> */}
    </div>
  );
}
