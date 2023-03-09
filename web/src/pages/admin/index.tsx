import React from 'react';
import { AdminPage } from '@/features';
import { withAuthRequired } from '@/utils/withAuthRequired';
import { PageType } from '@/types';

export default function Admin(): React.ReactNode {
  return <AdminPage />;
}

export const getServerSideProps = withAuthRequired(null, PageType.ADMIN);
