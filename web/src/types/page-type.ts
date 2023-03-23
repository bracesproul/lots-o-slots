export enum PageType {
  HOME = 'HOME',
  USER = 'USER',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  ADMIN = 'ADMIN',
  LOGOUT = 'LOGOUT',
  ADMIN_USERS = 'ADMIN_USERS',
  ADMIN_PAYMENTS = 'ADMIN_PAYMENTS',
  ADMIN_ACCOUNTS = 'ADMIN_ACCOUNTS',
  ADMIN_WITHDRAWALS = 'ADMIN_WITHDRAWALS',
  ADMIN_EMAIL_LIST = 'ADMIN_EMAIL_LIST',
}

export const ADMIN_PAGES = [
  PageType.ADMIN,
  PageType.ADMIN_USERS,
  PageType.ADMIN_PAYMENTS,
  PageType.ADMIN_ACCOUNTS,
  PageType.ADMIN_WITHDRAWALS,
  PageType.ADMIN_EMAIL_LIST,
];

export const pageName = (page: PageType) => {
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
    case PageType.ADMIN_EMAIL_LIST:
      return 'Emails';
    case PageType.USER:
      return 'User';
    default:
      'Admin';
  }
};
