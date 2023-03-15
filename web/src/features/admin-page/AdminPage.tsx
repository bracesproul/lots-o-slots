import { ReactElement } from 'react';
import { PageChangeType, TableType } from '@/types/page-change';
import { StylePrefix } from '@/types/style-prefix';
import { AdminPageHeader } from '../admin-page-header';
import { PageType } from '@/types';

export type AdminPageProps = {
  /**
   * Function to handle marking the payment as processed.
   */
  handleMarkProcessed?: (id: string) => void;

  /**
   * Handle pagination.
   */
  handlePageChange: (direction: PageChangeType, table: TableType) => void;
};

const PREFIX = StylePrefix.ADMIN_PAGE_V2;

export default function AdminPage(): ReactElement {
  return (
    <div className={`${PREFIX}`}>
      <AdminPageHeader page={PageType.ADMIN} />
    </div>
  );
}
