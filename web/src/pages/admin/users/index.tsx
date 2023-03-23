import React from 'react';
import { AdminUsersPage } from '@/features';
import { withAuthRequired } from '@/utils/withAuthRequired';
import { PageType } from '@/types';

export default function Admin(): React.ReactNode {
  return <AdminUsersPage />;
}

export const getServerSideProps = withAuthRequired(null, PageType.ADMIN_USERS);
