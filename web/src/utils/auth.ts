import {
  SUPABASE_USER_ID_COOKIE_KEY,
  SUPABASE_REFRESH_TOKEN_COOKIE_KEY,
} from '@/types';
import { CookieStorage } from 'local-storage-fallback';
import isServer from './isServer';

export const getAuthHeaders = () => {
  if (!isServer()) {
    const cookieStorage = new CookieStorage();

    const supabaseUserId = cookieStorage.getItem(SUPABASE_USER_ID_COOKIE_KEY);
    const supabaseRefreshToken = cookieStorage.getItem(
      SUPABASE_REFRESH_TOKEN_COOKIE_KEY
    );

    return {
      supabaseUserId: supabaseUserId ?? undefined,
      supabaseRefreshToken: supabaseRefreshToken ?? undefined,
    };
  }
};

export const removeAuthHeaders = () => {
  if (!isServer()) {
    const cookieStorage = new CookieStorage();

    cookieStorage.removeItem(SUPABASE_USER_ID_COOKIE_KEY);
    cookieStorage.removeItem(SUPABASE_REFRESH_TOKEN_COOKIE_KEY);
  }
};
