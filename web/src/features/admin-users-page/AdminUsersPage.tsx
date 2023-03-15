import { ReactElement } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { DashboardPageHeader } from '@/features';
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
      <DashboardPageHeader includePageNav page={PageType.ADMIN_USERS} />
    </div>
  );
}
