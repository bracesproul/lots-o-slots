import {
  queryTypes,
  SerializersWithDefaultFactory,
  useQueryStates,
} from 'next-usequerystate';

type UseSearchQueryOptions = {
  // add options
};

type UseSearchQueryAction = {
  getQueryParams: (queryParam: SearchQueryParam) => string[] | null;
  addSearchQueryParam: (values: string[], queryParam: SearchQueryParam) => void;
  removeSearchQueryParam: (queryParam: SearchQueryParam) => void;
};

type UseSearchQueryState = {
  // add state
};

type UseSearchQueryValue = UseSearchQueryState & UseSearchQueryAction;

export enum SearchQueryParam {
  PENDING_PAYMENTS = 'pending-payments',
  PROCESSED_PAYMENTS = 'processed-payments',
  ALL_ACCOUNTS_SEARCH = 'all-accounts-search',
  USERS_SEARCH = 'users-search',
  PENDING_WITHDRAWALS = 'pending-withdrawals',
  REJECTED_WITHDRAWALS = 'rejected-withdrawals',
  APPROVED_WITHDRAWALS = 'approved-withdrawals',
  EMAIL_LIST = 'email-list',
}

const useSearchQuery = (props?: UseSearchQueryOptions): UseSearchQueryValue => {
  const params = Object.values(SearchQueryParam);
  const possibleParams = params.reduce(
    (acc, curr) => ({ ...acc, [curr]: queryTypes.array(queryTypes.string) }),
    {}
  ) as Record<SearchQueryParam, SerializersWithDefaultFactory<string[]>>;

  const [dropdownParams, setDropdownParams] = useQueryStates(possibleParams);

  const addSearchQueryParam = (
    values: string[],
    queryParam: SearchQueryParam
  ) => {
    if (Object.values(SearchQueryParam).includes(queryParam) === false) {
      throw new Error('Invalid query param');
    }
    setDropdownParams({
      ...dropdownParams,
      [queryParam]: values,
    });
  };

  const removeSearchQueryParam = (queryParam: SearchQueryParam) => {
    setDropdownParams({ ...dropdownParams, [queryParam]: null });
  };

  const getQueryParams = (queryParam: SearchQueryParam) => {
    return dropdownParams[queryParam];
  };

  return {
    getQueryParams,
    addSearchQueryParam,
    removeSearchQueryParam,
  };
};

export default useSearchQuery;
