import { ReactElement } from 'react';
import { PaymentsTable } from './components';
import { dummyPaymentInfo } from '@/dummy/payments-table';
import { PageChangeType, TableType } from '@/types/page-change';

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

function AdminPage(props: AdminPageProps): ReactElement {
  return (
    <div className={`${PREFIX}`}>
      <PaymentsTable
        handlePageChange={props.handlePageChange}
        handleMarkProcessed={props.handleMarkProcessed}
        includeActionColumn
        data={dummyPaymentInfo}
        tableType={TableType.PENDING}
      />
      <PaymentsTable
        handlePageChange={props.handlePageChange}
        tableType={TableType.PROCESSED}
        data={dummyPaymentInfo}
      />
    </div>
  );
}

export default function AdminPageContainer(): ReactElement {
  const handlePageChange = (direction: PageChangeType, table: TableType) => {
    console.log('page change:', direction, table);
  };
  const handleMarkProcessed = (id: string) => {
    console.log('marking as processed:', id);
  };
  return (
    <AdminPage
      handlePageChange={handlePageChange}
      handleMarkProcessed={handleMarkProcessed}
    />
  );
}
