import { CookieStorage } from 'local-storage-fallback';

export default function findUserId() {
  const cookie = new CookieStorage();
  return cookie.getItem('user_id');
}
