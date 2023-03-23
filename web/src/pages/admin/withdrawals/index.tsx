import React from 'react';
import { AdminWithdrawalsPage } from '@/features';
import { withAuthRequired } from '@/utils/withAuthRequired';
import { PageType } from '@/types';

export default function Withdrawals(): React.ReactNode {
  return <AdminWithdrawalsPage />;
}

export const getServerSideProps = withAuthRequired(
  null,
  PageType.ADMIN_WITHDRAWALS
);
