import React from 'react';
import { AdminAccountsPage } from '@/features';
import { withAuthRequired } from '@/utils/withAuthRequired';
import { PageType } from '@/types';

export default function Admin(): React.ReactNode {
  return <AdminAccountsPage />;
}

export const getServerSideProps = withAuthRequired(
  null,
  PageType.ADMIN_ACCOUNTS
);
