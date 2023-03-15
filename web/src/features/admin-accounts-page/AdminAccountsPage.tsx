import { ReactElement } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { DashboardPageHeader } from '@/features';
import { PageType } from '@/types';
import { AccountCard, AccountForm } from './components';
import { dummyAccounts } from '@/dummy/accounts';
import { Account } from './components/account-card/AccountCard';

export type AdminAccountsPageProps = {
  /** The list of accounts to show */
  accounts: Account[];
};

const PREFIX = StylePrefix.ADMIN_ACCOUNTS_PAGE;

function AdminAccountsPage(props: AdminAccountsPageProps): ReactElement {
  return (
    <div className={`${PREFIX}`}>
      <DashboardPageHeader includePageNav page={PageType.ADMIN_ACCOUNTS} />
      <div className={'flex flex-row justify-between'}>
        <div className={`${PREFIX}-account-cards-wrapper`}>
          {props.accounts.map((account, i) => (
            <AccountCard {...account} key={i} />
          ))}
        </div>
        <div className={`${PREFIX}-account-form-wrapper`}>
          <AccountForm isEditMode={false} />
        </div>
      </div>
    </div>
  );
}

export default function AdminAccountsPageContainer(): ReactElement {
  return <AdminAccountsPage accounts={dummyAccounts} />;
}
