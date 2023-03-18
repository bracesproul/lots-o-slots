import { Button } from '@/components';
import {
  ADMIN_ACCOUNTS_PAGE,
  ADMIN_PAGE,
  ADMIN_PAYMENTS_PAGE,
  ADMIN_USERS_PAGE,
  ADMIN_WITHDRAWALS_PAGE,
  PageType,
  StylePrefix,
} from '@/types';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

export type AdminPageHeaderProps = {
  /** The type of page this header is for */
  page: PageType;
  /**
   * Whether or not to include the page nav
   * @default false
   * */
  includePageNav?: boolean;
};

const PREFIX = StylePrefix.ADMIN_PAGE_HEADER;

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
    case PageType.ADMIN_WITHDRAWALS:
      return 'Withdrawals';
    case PageType.USER:
      return 'User';
    default:
      'Admin';
  }
};

const DEFAULT_PROPS = {
  includePageNav: false,
};

export default function DashboardPageHeader(
  props: AdminPageHeaderProps
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const router = useRouter();

  return (
    <div className={`${PREFIX}-header-container`}>
      <h1 className={`${PREFIX}-header`}>
        <span className={'red-span-text'}>{pageName(props.page)}</span>
        <span className={'ml-[16px]'}>Page</span>
      </h1>
      {p.includePageNav && (
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
              'is-selected': router.pathname === ADMIN_WITHDRAWALS_PAGE,
            })}
            href={ADMIN_PAYMENTS_PAGE}
          >
            /payments
          </Link>
          <Link
            className={clsx(`${PREFIX}-nav-item`, {
              'is-selected': router.pathname === ADMIN_WITHDRAWALS_PAGE,
            })}
            href={ADMIN_WITHDRAWALS_PAGE}
          >
            /withdrawals
          </Link>
        </div>
      )}

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
