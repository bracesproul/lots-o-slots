import { CookieStorage } from 'local-storage-fallback';

export default function handleSetUserCookie(id?: string) {
  if (!id) return;
  const cookie = new CookieStorage();
  cookie.setItem('user_id', id);
}
