import React from 'react';
import { AdminPage } from '@/features';
import { withAuthRequired } from '@/utils/withAuthRequired';

export default function Admin(): React.ReactNode {
  return <AdminPage />;
}

export const getServerSideProps = withAuthRequired(null, {
  redirect: true,
  isAuthPage: true,
});
