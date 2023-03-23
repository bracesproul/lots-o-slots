import { ReactElement, useEffect } from 'react';
import { removeAuthHeaders } from '@/utils';
import { PageType } from '@/types';
import { withLogout } from '@/utils/withAuthRequired';

export default function Logout(): ReactElement {
  useEffect(() => {
    console.log('use effect did do be ran');
    removeAuthHeaders();
  }, []);
  return <div>logout page</div>;
}

export const getServerSideProps = withLogout(null, PageType.LOGOUT);
