import { ReactElement } from 'react';
import { CashappAccountCard } from './components';
import { Button } from '@/components';

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
          className={`${PREFIX}-action-button`}
          variant="secondary"
          type="button"
        >
          Add CashApp Account
        </Button>
      </div>
    </div>
  );
}
