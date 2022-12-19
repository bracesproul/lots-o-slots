import React from 'react';
import { AdminPage } from '@/features';
import { withAuthRequired } from '@/utils';
import { GetServerSidePropsContext } from 'next';

export default function Admin(): React.ReactNode {
  return <AdminPage />;
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return withAuthRequired(context);
};
