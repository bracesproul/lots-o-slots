import { isServer } from '@/utils';
import localStorage, { CookieStorage } from 'local-storage-fallback';
import { useState } from 'react';
import { useRouter } from 'next/router';

type UseAuthState = {
  isAuthed: boolean;
};

type UseAuthValue = UseAuthState;

const STORAGE_KEY = 'lots_o_slots_auth';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useAuth(): UseAuthValue {
  const [isAuthed, setIsAuthed] = useState(false);
  const router = useRouter();
  if (!isServer()) {
    const cookieStorage = new CookieStorage();
    const auth =
      cookieStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(STORAGE_KEY);
    // TODO: Hit backend to check if auth key is correct.
    if (auth === 'pizza') {
      setIsAuthed(true);
    } else {
      router.push('/admin/authorize');
    }
    // if (res) {
    //   setIsAuthed(true);
    // }
  }
  return {
    isAuthed,
  };
}

export default useAuth;
