import { ReactElement } from 'react';
import { PaymentsTable, AccountsCard } from './components';
import { dummyPaymentInfo, dummyCashappAccounts } from '@/dummy';
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

function AdminPage(props: AdminPageProps): ReactElement {
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
      <div className={`${PREFIX}-second-level`}>
        <div className={`${PREFIX}-accounts-container`}>
          <AccountsCard cashappAccount={dummyCashappAccounts} />
        </div>
      </div>
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
