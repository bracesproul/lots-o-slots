import { ReactElement } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { AdminPageHeader } from '../admin-page-header';
import { PageType } from '@/types';

export type AdminPaymentsPageProps = {
  // Add props
};

const PREFIX = StylePrefix.ADMIN_PAYMENTS_PAGE;

export default function AdminPaymentsPage(
  props: AdminPaymentsPageProps
): ReactElement {
  return (
    <div className={`${PREFIX}`}>
      <AdminPageHeader page={PageType.ADMIN_PAYMENTS} />
    </div>
  );
}
