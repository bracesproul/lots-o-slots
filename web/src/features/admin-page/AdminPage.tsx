import { ReactElement } from 'react';
import { PaymentsTable } from './components';
import { dummyPaymentInfo } from '@/dummy/payments-table';

export default function AdminPage(): ReactElement {
  return (
    <div className="admin-page">
      <PaymentsTable title="Pending Payments" data={dummyPaymentInfo} />
    </div>
  );
}
