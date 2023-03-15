import React from 'react';
import { AdminPaymentsPage } from '@/features';
import { withAuthRequired } from '@/utils/withAuthRequired';
import { PageType } from '@/types';

export default function Admin(): React.ReactNode {
  return <AdminPaymentsPage />;
}

export const getServerSideProps = withAuthRequired(
  null,
  PageType.ADMIN_PAYMENTS
);
