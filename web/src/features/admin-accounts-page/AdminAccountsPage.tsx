import { ReactElement } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { DashboardPageHeader } from '@/features';
import { PageType } from '@/types';
import { AccountCard, AccountForm } from './components';
import { getAccountFromBasicAccountFragment } from './getAccountFromBasicAccountFragment';
import { Account } from './components/account-card/AccountCard';
import useEditAccountQueryParams from './useEditAccountQueryParams';
import { PaymentProvider, useGetAllAccountsQuery } from '@/generated/graphql';

export type AdminAccountsPageProps = {
  /** The list of accounts to show */
  accounts: Account[];
  /** Handle edit account function */
  handleEditAccount: (accountId: string) => void;
};

const PREFIX = StylePrefix.ADMIN_ACCOUNTS_PAGE;

function AdminAccountsPage(props: AdminAccountsPageProps): ReactElement {
  return (
    <div className={`${PREFIX}`}>
      <DashboardPageHeader includePageNav page={PageType.ADMIN_ACCOUNTS} />
      <div className={'flex flex-row justify-between'}>
        <div className={`${PREFIX}-account-cards-wrapper`}>
          {props.accounts.map((account, i) => (
            <AccountCard
              onEdit={props.handleEditAccount}
              {...account}
              key={i}
            />
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
  const { updateAccountId } = useEditAccountQueryParams();
  const { data, loading, error } = useGetAllAccountsQuery();
  const accounts =
    data?.getAllAccounts.map((account) =>
      getAccountFromBasicAccountFragment(account)
    ) ?? [];
  return (
    <AdminAccountsPage
      handleEditAccount={updateAccountId}
      accounts={accounts.reverse()}
    />
  );
}
