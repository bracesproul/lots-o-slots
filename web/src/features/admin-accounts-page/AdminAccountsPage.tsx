import { ReactElement } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { DashboardPageHeader } from '@/features';
import { PageType } from '@/types';

export type AdminAccountsPageProps = {
  // Add props
};

const PREFIX = StylePrefix.ADMIN_ACCOUNTS_PAGE;

export default function AdminAccountsPage(
  props: AdminAccountsPageProps
): ReactElement {
  return (
    <div className={`${PREFIX}`}>
      <DashboardPageHeader includePageNav page={PageType.ADMIN_ACCOUNTS} />
    </div>
  );
}
