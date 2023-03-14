import { SUPABASE_USER_ID_COOKIE_KEY } from '@/types';
import { CookieStorage } from 'local-storage-fallback';
import { isServer } from '@/utils';

type UseUserOptions = {
  // no options
};

type UseUserAction = {
  // no actions
};

type UseUserState = {
  /** The supabase user ID */
  userId?: string | null;
};

type UseUserValue = UseUserState & UseUserAction;

const useUser = (props?: UseUserOptions): UseUserValue => {
  if (isServer()) return {};
  const cookieStorage = new CookieStorage();
  const userId = cookieStorage.getItem(SUPABASE_USER_ID_COOKIE_KEY);
  return {
    userId,
  };
};

export default useUser;
