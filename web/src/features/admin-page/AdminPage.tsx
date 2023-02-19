import { ReactElement } from 'react';
import { PaymentsTable, AccountsCard, UserPaymentsTable } from './components';
import { PageChangeType, TableType } from '@/types/page-change';
import { Button } from '@/components';
import { useRouter } from 'next/router';

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

const PREFIX = 'admin-page';

export default function AdminPage(): ReactElement {
  const router = useRouter();
  return (
    <div className={`${PREFIX}`}>
      <div className={`${PREFIX}-header-container`}>
        <h1 className={`${PREFIX}-header`}>
          <span className={'red-span-text'}>Admin</span>
          <span className={'ml-[16px]'}>Page</span>
        </h1>
        <Button
          onPress={() => router.push('/')}
          className={`${PREFIX}-button`}
          type="button"
        >
          Home
        </Button>
      </div>
      <div className={`${PREFIX}-table-container`}>
        <PaymentsTable />
      </div>
      <div className={`${PREFIX}-second-level`}>
        <UserPaymentsTable />
        <AccountsCard />
      </div>
    </div>
  );
}
