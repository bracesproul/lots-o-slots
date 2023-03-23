import React from 'react';
import { AdminEmailsPage } from '@/features';
import { withAuthRequired } from '@/utils/withAuthRequired';
import { PageType } from '@/types';

export default function Admin(): React.ReactNode {
  return <AdminEmailsPage />;
}

export const getServerSideProps = withAuthRequired(
  null,
  PageType.ADMIN_EMAIL_LIST
);
