import { ReactElement } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { AdminPageHeader } from '../dashboard-page-header';
import { PageType, PaymentProvider } from '@/types';
import { GameType } from '@/generated/graphql';
import { DataTable, Text, Badge } from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { findBadgeVariantFromPaymentType } from '../play-now-dialog-depd/utils';

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
      <PaymentTable />
    </div>
  );
}

const getBadgeVariantForGame = (game: GameType) => {
  switch (game) {
    case GameType.POKER:
      return 'danger';
    case GameType.SLOTS:
      return 'primary';
  }
};

export enum PaymentMethod {
  PAYPAL = 'PAYPAL',
  ZELLE = 'ZELLE',
  CASH_APP = 'CASH_APP',
  BTC = 'BTC',
  ETH = 'ETH',
}

export type Payment = {
  id: string;
  amount: number;
  date: Date;
  processed: boolean;
  game: GameType;
  paymentMethod: PaymentProvider;
  userIdentifier: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    header: 'Customer',
    accessorKey: 'userIdentifier',
    cell: (props) => {
      return (
        <div>
          <Text type="body-sm" className={'text-brand-500 leading-5'}>
            {props.getValue<Payment['userIdentifier']>()}
          </Text>
        </div>
      );
    },
  },
  {
    header: 'Amount',
    accessorKey: 'amount',
    cell: (props) => {
      return (
        <div>
          <Text type="body-sm">
            ${`${props.getValue<Payment['amount']>()}`}
          </Text>
        </div>
      );
    },
  },
  {
    header: 'Game',
    accessorKey: 'game',
    cell: (props) => {
      return (
        <div>
          <Badge
            className="text-gray-600"
            size="small"
            variant={getBadgeVariantForGame(props.getValue<Payment['game']>())}
          >
            {props.getValue<Payment['game']>()}
          </Badge>
        </div>
      );
    },
  },
  {
    header: 'Payment Method',
    accessorKey: 'paymentMethod',
    cell: (props) => {
      return (
        <div>
          <Badge
            className="text-gray-600"
            size="small"
            variant={findBadgeVariantFromPaymentType(
              props.getValue<Payment['paymentMethod']>()
            )}
          >
            {props.getValue<Payment['paymentMethod']>()}
          </Badge>
        </div>
      );
    },
  },
  {
    header: 'Date',
    accessorKey: 'date',
    cell: (props) => {
      return (
        <div>
          <Text type="body-sm">
            {format(props.getValue<Payment['date']>(), 'MM/dd/yyyy hh:mm')}
          </Text>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: (props) => {
      return (
        <div>
          <Badge
            onPress={() => console.log('mark processed')}
            className="text-black"
            size="small"
            variant="info"
          >
            Mark Processed
          </Badge>
        </div>
      );
    },
  },
];

const dummyPaymentData: Payment[] = [
  {
    id: '1',
    amount: 100,
    date: new Date('2021-01-01'),
    processed: true,
    game: GameType.POKER,
    paymentMethod: PaymentProvider.PAYPAL,
    userIdentifier: 'test one',
  },
  {
    id: '2',
    amount: 100,
    date: new Date('2021-01-01'),
    processed: true,
    game: GameType.POKER,
    paymentMethod: PaymentProvider.ZELLE,
    userIdentifier: 'test two',
  },
  {
    id: '3',
    amount: 100,
    date: new Date('2021-01-01'),
    processed: false,
    game: GameType.POKER,
    paymentMethod: PaymentProvider.CASHAPP,
    userIdentifier: 'test three',
  },
];

function PaymentTable(): ReactElement {
  return (
    <div className="flex justify-center mx-[20%]">
      <DataTable
        isLoading={false}
        data={dummyPaymentData}
        columns={columns}
        isLeftMostColumnSticky
        isRightMostColumnSticky
        onRowPress={console.log}
      />
    </div>
  );
}
