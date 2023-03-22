import { ReactElement, useMemo } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { DashboardPageHeader } from '@/features';
import { PageType } from '@/types';
import { AccountCard, AccountForm } from './components';
import { getAccountFromBasicAccountFragment } from './getAccountFromBasicAccountFragment';
import { Account } from './components/account-card/AccountCard';
import useEditAccountQueryParams from './useEditAccountQueryParams';
import {
  PaymentProvider,
  useGetAllAccountsQuery,
  useMakeAccountDefaultMutation,
} from '@/generated/graphql';
import { Button, SearchField } from '@/components';
import useSearchQuery, { SearchQueryParam } from '@/hooks/useSearchQuery';

export type AdminAccountsPageProps = {
  /** The list of accounts to show */
  accounts: Account[];
  /** Handle edit account function */
  handleEditAccount: (accountId: string) => void;
  /** Event handler for setting the query params for a search value */
  setSearchQuery: (search: string, queryParam: SearchQueryParam) => void;
  /** Event handler for making account default */
  makeAccountDefault: (id: string) => void;
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
              {...account}
              onEdit={props.handleEditAccount}
              key={i}
              makeAccountDefault={p.makeAccountDefault}
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

// Define the order of providers
const providerOrder = [
  PaymentProvider.CASHAPP,
  PaymentProvider.ZELLE,
  PaymentProvider.PAYPAL,
  PaymentProvider.BITCOIN,
  PaymentProvider.ETHEREUM,
];

// Define the comparison function
const compareProvider = (a: Account, b: Account) => {
  const aProviderIndex = providerOrder.indexOf(a.paymentProvider);
  const bProviderIndex = providerOrder.indexOf(b.paymentProvider);
  if (aProviderIndex !== bProviderIndex) {
    // If providers are different, sort by provider order
    return aProviderIndex - bProviderIndex;
  } else {
    const bUpdatedAtTime = new Date(b.updatedAt).getTime();
    const aUpdatedAtTime = new Date(a.updatedAt).getTime();
    // If providers are the same, sort by updatedAt
    return bUpdatedAtTime - aUpdatedAtTime;
  }
};

export default function AdminAccountsPageContainer(): ReactElement {
  const { updateAccountId } = useEditAccountQueryParams();
  const [makeAccountDefault] = useMakeAccountDefaultMutation();
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
      const sorted = accounts.sort(compareProvider);
      return sorted;
    }
    const query = decodeURIComponent(allAccountsSearchQuery[0]);
    const filtered = accounts.filter((account) => {
      return Object.values(account).some((value) => {
        return (
          value && value.toString().toLowerCase().includes(query.toLowerCase())
        );
      });
    });
    const sorted = filtered.sort(compareProvider);
    return sorted.reverse();
  }, [accounts, allAccountsSearchQuery]);

  const handleMAccountDefault = async (id: string) => {
    await makeAccountDefault({
      variables: { id },
      refetchQueries: ['GetAllAccounts'],
    });
  };

  return (
    <AdminAccountsPage
      handleEditAccount={updateAccountId}
      accounts={filteredAccounts}
      setSearchQuery={setSearchQuery}
      makeAccountDefault={handleMAccountDefault}
    />
  );
}
