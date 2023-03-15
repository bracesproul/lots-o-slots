import { Button } from '@/components';
import { PageType, StylePrefix } from '@/types';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

export type AdminPageHeaderProps = {
  page: PageType;
};

const PREFIX = StylePrefix.ADMIN_PAGE_HEADER;

const ADMIN_USERS_PAGE = '/admin/users';
const ADMIN_PAYMENTS_PAGE = '/admin/payments';
const ADMIN_ACCOUNTS_PAGE = '/admin/accounts';
const ADMIN_PAGE = '/admin';

const pageName = (page: PageType) => {
  switch (page) {
    case PageType.ADMIN:
      return 'Admin';
    case PageType.ADMIN_USERS:
      return 'Users';
    case PageType.ADMIN_PAYMENTS:
      return 'Payments';
    case PageType.ADMIN_ACCOUNTS:
      return 'Accounts';
    default:
      'Admin';
  }
};

export default function AdminPageHeader(
  props: AdminPageHeaderProps
): ReactElement {
  const router = useRouter();

  return (
    <div className={`${PREFIX}-header-container`}>
      <h1 className={`${PREFIX}-header`}>
        <span className={'red-span-text'}>{pageName(props.page)}</span>
        <span className={'ml-[16px]'}>Page</span>
      </h1>
      <div className={`${PREFIX}-nav`}>
        <Link
          className={clsx(`${PREFIX}-nav-item`, {
            'is-selected': router.pathname === ADMIN_PAGE,
          })}
          href={ADMIN_PAGE}
        >
          /
        </Link>
        <Link
          className={clsx(`${PREFIX}-nav-item`, {
            'is-selected': router.pathname === ADMIN_USERS_PAGE,
          })}
          href={ADMIN_USERS_PAGE}
        >
          /users
        </Link>
        <Link
          className={clsx(`${PREFIX}-nav-item`, {
            'is-selected': router.pathname === ADMIN_ACCOUNTS_PAGE,
          })}
          href={ADMIN_ACCOUNTS_PAGE}
        >
          /accounts
        </Link>
        <Link
          className={clsx(`${PREFIX}-nav-item`, {
            'is-selected': router.pathname === ADMIN_PAYMENTS_PAGE,
          })}
          href={ADMIN_PAYMENTS_PAGE}
        >
          /payments
        </Link>
      </div>
      <div className={`${PREFIX}-header-actions-wrapper`}>
        <Button
          onPress={async () => await router.push('/')}
          className={`${PREFIX}-button`}
          type="button"
        >
          Home
        </Button>
        <Button
          onPress={async () => await router.push('/logout')}
          className={`${PREFIX}-button`}
          type="button"
          variant="secondary"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
