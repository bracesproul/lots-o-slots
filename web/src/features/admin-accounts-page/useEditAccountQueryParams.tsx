import { queryTypes, useQueryStates } from 'next-usequerystate';

type UseEditAccountQueryParamsOptions = {
  // add options
};

type UseEditAccountQueryParamsAction = {
  updateAccountId: (accountId: string) => void;
  removeAccountId: () => void;
};

type UseEditAccountQueryParamsState = {
  accountId: string | null;
};

type UseEditAccountQueryParamsValue = UseEditAccountQueryParamsState &
  UseEditAccountQueryParamsAction;

const useEditAccountQueryParams = (
  props?: UseEditAccountQueryParamsOptions
): UseEditAccountQueryParamsValue => {
  const possibleParams = {
    accountId: queryTypes.string,
  };
  const [dropdownParams, setDropdownParams] = useQueryStates(possibleParams);

  const updateAccountId = (accountId: string) => {
    setDropdownParams({ accountId });
  };

  const removeAccountId = () => {
    setDropdownParams({ accountId: null });
  };

  const accountId = dropdownParams.accountId;

  return {
    accountId,
    updateAccountId,
    removeAccountId,
  };
};

export default useEditAccountQueryParams;
