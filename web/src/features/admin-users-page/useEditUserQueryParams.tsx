import { queryTypes, useQueryStates } from 'next-usequerystate';

type UseEditUserQueryParamsOptions = {
  // add options
};

type UseEditUserQueryParamsAction = {
  updateUserId: (accountId: string) => void;
  removeUserId: () => void;
};

type UseEditUserQueryParamsState = {
  userId: string | null;
};

type UseEditUserQueryParamsValue = UseEditUserQueryParamsState &
  UseEditUserQueryParamsAction;

const useEditUserQueryParams = (
  props?: UseEditUserQueryParamsOptions
): UseEditUserQueryParamsValue => {
  const possibleParams = {
    userId: queryTypes.string,
  };
  const [dropdownParams, setDropdownParams] = useQueryStates(possibleParams);

  const updateUserId = (userId: string) => {
    setDropdownParams({ userId });
  };

  const removeUserId = () => {
    setDropdownParams({ userId: null });
  };

  const userId = dropdownParams.userId;

  return {
    userId,
    updateUserId,
    removeUserId,
  };
};

export default useEditUserQueryParams;
