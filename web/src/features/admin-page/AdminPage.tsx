import { ReactElement } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { DashboardPageHeader } from '../dashboard-page-header';
import { PageType } from '@/types';
import { UserRole } from '@/generated/graphql';
import { ProfileCard } from '@/features';

export type AdminPageProps = {
  // Add props
};

const PREFIX = StylePrefix.ADMIN_PAGE_V2;

function AdminPage(props: AdminPageProps): ReactElement {
  return (
    <div className={`${PREFIX}`}>
      <DashboardPageHeader page={PageType.ADMIN} includePageNav />
      <ProfileCard role={UserRole.ADMIN} />
    </div>
  );
}

export default function AdminPageContainer(): ReactElement {
  return <AdminPage />;
}
