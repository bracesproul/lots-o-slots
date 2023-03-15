import { ReactElement } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { DashboardPageHeader } from '@/features';
import { PageType, PaymentProvider } from '@/types';
import { AccountCard } from './components';
import clsx from 'clsx';

export type AdminAccountsPageProps = {
  // Add props
};

const PREFIX = StylePrefix.ADMIN_ACCOUNTS_PAGE;

export default function AdminAccountsPage(
  props: AdminAccountsPageProps
): ReactElement {
  return (
    <div className={`${PREFIX}`}>
      <DashboardPageHeader includePageNav page={PageType.ADMIN_ACCOUNTS} />
      <div className={`${PREFIX}-account-cards-wrapper`}>
        {dummyAccounts.map((account, i) => (
          <AccountCard {...account} key={i} />
        ))}
      </div>
    </div>
  );
}

const PREFIX_FORM = StylePrefix.ACCOUNT_FORM;

export type AccountFormProps = {
  /** Optional className to override default styles. */
  className?: string;
};

const DEFAULT_PROPS = {
  // add default props
};

function AccountForm(props: AccountFormProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  return <div className={clsx(PREFIX_FORM, p.className)}></div>;
}

const dummyAccounts = [
  {
    id: '1',
    name: 'CA Acc one',
    identifier: '$cashtag',
    balance: 1000,
    paymentProvider: PaymentProvider.CASHAPP,
    isDefault: true,
  },
  {
    id: '2',
    name: 'CA Acc two',
    identifier: '$cashtag_two',
    balance: 10222,
    paymentProvider: PaymentProvider.CASHAPP,
    isDefault: false,
  },
  {
    id: '3',
    name: 'CA Acc three',
    identifier: '$cashtag_three',
    balance: 872,
    paymentProvider: PaymentProvider.CASHAPP,
    isDefault: false,
  },
  {
    id: '4',
    name: 'CA Acc four',
    identifier: '$cashtag_four',
    balance: 552,
    paymentProvider: PaymentProvider.CASHAPP,
    isDefault: false,
  },
];
