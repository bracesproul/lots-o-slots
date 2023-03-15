import { ReactElement } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { AdminPageHeader } from '../admin-page-header';
import { PageType } from '@/types';

export type AdminUsersPageProps = {
  // Add props
};

const PREFIX = StylePrefix.ADMIN_USERS_PAGE;

export default function AdminUsersPage(
  props: AdminUsersPageProps
): ReactElement {
  return (
    <div className={`${PREFIX}`}>
      <AdminPageHeader page={PageType.ADMIN_USERS} />
    </div>
  );
}
