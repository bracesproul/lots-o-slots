import { CookieStorage } from 'local-storage-fallback';
import isServer from './isServer';

export function handleSetUserCookie(key: string, value: string) {
  if (isServer()) return;
  const cookie = new CookieStorage();
  cookie.setItem(key, value);
}

export function handleGetUserCookie(key: string) {
  if (isServer()) return;
  const cookie = new CookieStorage();
  return cookie.getItem(key);
}
