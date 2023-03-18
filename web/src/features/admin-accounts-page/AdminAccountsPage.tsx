import { ReactElement, useMemo } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { DashboardPageHeader } from '@/features';
import { PageType } from '@/types';
import { AccountCard, AccountForm } from './components';
import { getAccountFromBasicAccountFragment } from './getAccountFromBasicAccountFragment';
import { Account } from './components/account-card/AccountCard';
import useEditAccountQueryParams from './useEditAccountQueryParams';
import { useGetAllAccountsQuery } from '@/generated/graphql';
import { Button, SearchField } from '@/components';
import useSearchQuery, { SearchQueryParam } from '@/hooks/useSearchQuery';

export type AdminAccountsPageProps = {
  /** The list of accounts to show */
  accounts: Account[];
  /** Handle edit account function */
  handleEditAccount: (accountId: string) => void;
  /** Event handler for setting the query params for a search value */
  setSearchQuery: (search: string, queryParam: SearchQueryParam) => void;
};

const PREFIX = StylePrefix.ADMIN_ACCOUNTS_PAGE;

function AdminAccountsPage(props: AdminAccountsPageProps): ReactElement {
  const p = props;

  return (
    <div className={`${PREFIX}`}>
      <DashboardPageHeader includePageNav page={PageType.ADMIN_ACCOUNTS} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // @typescript-eslint/ban-ts-comment
          // eslint-disable-next-line
              // @ts-ignore
          const input = e.target.elements['allAccountsSearch'];
          const value = input.value;
          p.setSearchQuery(value, SearchQueryParam.ALL_ACCOUNTS_SEARCH);
        }}
        className={`${PREFIX}-search-form`}
      >
        <SearchField
          name="allAccountsSearch"
          aria-label="Search Processed Payments"
          placeholder="Search"
        />
        <Button variant="secondary" size="xsmall" type="submit">
          Submit
        </Button>
      </form>
      <div className={'flex flex-row justify-between'}>
        <div className={`${PREFIX}-account-cards-wrapper`}>
          {p.accounts.map((account, i) => (
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

  const { addSearchQueryParam, getQueryParams } = useSearchQuery();
  const allAccountsSearchQuery = getQueryParams(
    SearchQueryParam.ALL_ACCOUNTS_SEARCH
  );

  const setSearchQuery = (search: string, queryParam: SearchQueryParam) => {
    const params = encodeURIComponent(search);
    addSearchQueryParam([params], queryParam);
  };

  const filteredAccounts = useMemo(() => {
    if (!allAccountsSearchQuery) {
      return accounts;
    }
    const query = decodeURIComponent(allAccountsSearchQuery[0]);
    return accounts.filter((account) => {
      return Object.values(account).some((value) => {
        return (
          value && value.toString().toLowerCase().includes(query.toLowerCase())
        );
      });
    });
  }, [accounts, allAccountsSearchQuery]);

  return (
    <AdminAccountsPage
      handleEditAccount={updateAccountId}
      accounts={filteredAccounts.reverse()}
      setSearchQuery={setSearchQuery}
    />
  );
}
