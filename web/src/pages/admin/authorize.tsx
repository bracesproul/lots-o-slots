import React from 'react';
import { AdminAuthorizePage } from '@/features';
import { withAuthRequired } from '@/utils/withAuthRequired';
import { GetServerSidePropsContext } from 'next';

export default function Authorize(): React.ReactNode {
  return <AdminAuthorizePage />;
}

export const getServerSideProps = withAuthRequired(null, {
  redirect: false,
  isFromAuthPage: true,
});

