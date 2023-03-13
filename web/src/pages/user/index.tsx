import { ReactElement } from 'react';
import { UserPage } from '@/features';
import { withAuthRequired } from '@/utils';
import { PageType } from '@/types';

export default function User(): ReactElement {
  return <UserPage />;
}

export const getServerSideProps = withAuthRequired(null, PageType.USER);
