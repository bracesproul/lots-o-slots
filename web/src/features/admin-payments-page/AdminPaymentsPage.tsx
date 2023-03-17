import { ReactElement } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { DashboardPageHeader } from '@/features';
import { PageType, PaymentProvider } from '@/types';
import { GameType } from '@/generated/graphql';
import { DataTable, Badge, InteractableComponent, Text } from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { findBadgeVariantFromPaymentType } from '../play-now-dialog-depd/utils';
import { CircleCheckMarkSvg, ReverseArrowSvg, TrashCanSvg } from '@/assets';
import {
  useGetProcessedPaymentsQuery,
  useGetPendingPaymentsQuery,
  useGetProcessedUserPaymentsQuery,
  useGetPendingUserPaymentsQuery,
} from '@/generated/graphql';

export type AdminPaymentsPageProps = {
  // Add props
};

const PREFIX = StylePrefix.ADMIN_PAYMENTS_PAGE;

export default function AdminPaymentsPage(
  props: AdminPaymentsPageProps
): ReactElement {
  return (
    <div className={`${PREFIX}`}>
      <DashboardPageHeader includePageNav page={PageType.ADMIN_PAYMENTS} />
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

export enum PaymentType {
  USER_SUBMITTED = 'USER_SUBMITTED',
  SCRAPED = 'SCRAPED',
}

export type Payment = {
  id: string;
  amount: number;
  date: Date;
  processed: boolean;
  game?: GameType;
  type: PaymentType;
  paymentMethod: PaymentProvider;
  userIdentifier: string;
};

const dummyUnprocessedPaymentData: Payment[] = [
  {
    id: '1',
    amount: 100,
    date: new Date('2021-01-01'),
    processed: false,
    game: GameType.POKER,
    paymentMethod: PaymentProvider.PAYPAL,
    userIdentifier: 'test one',
    type: PaymentType.USER_SUBMITTED,
  },
  {
    id: '2',
    amount: 100,
    date: new Date('2021-01-01'),
    processed: false,
    game: GameType.POKER,
    paymentMethod: PaymentProvider.ZELLE,
    userIdentifier: 'test two',
    type: PaymentType.USER_SUBMITTED,
  },
  {
    id: '3',
    amount: 100,
    date: new Date('2021-01-01'),
    processed: false,
    game: GameType.POKER,
    paymentMethod: PaymentProvider.CASHAPP,
    userIdentifier: 'test three',
    type: PaymentType.SCRAPED,
  },
];
const dummyProcessedPaymentData: Payment[] = [
  {
    id: '1',
    amount: 100,
    date: new Date('2021-01-01'),
    processed: true,
    game: GameType.POKER,
    paymentMethod: PaymentProvider.PAYPAL,
    userIdentifier: 'test one',
    type: PaymentType.USER_SUBMITTED,
  },
  {
    id: '2',
    amount: 100,
    date: new Date('2021-01-01'),
    processed: true,
    game: GameType.POKER,
    paymentMethod: PaymentProvider.ZELLE,
    userIdentifier: 'test two',
    type: PaymentType.USER_SUBMITTED,
  },
  {
    id: '3',
    amount: 100,
    date: new Date('2021-01-01'),
    processed: true,
    game: GameType.POKER,
    paymentMethod: PaymentProvider.CASHAPP,
    userIdentifier: 'test three',
    type: PaymentType.SCRAPED,
  },
];

function PaymentTable(): ReactElement {
  const { data: processedPaymentsData, loading: processedPaymentsLoading } =
    useGetProcessedPaymentsQuery();
  const { data: pendingPaymentsData, loading: pendingPaymentsLoading } =
    useGetPendingPaymentsQuery();
  const {
    data: processedUserPaymentsData,
    loading: processedUserPaymentsLoading,
  } = useGetProcessedUserPaymentsQuery();
  const { data: pendingUserPaymentsData, loading: pendingUserPaymentsLoading } =
    useGetPendingUserPaymentsQuery();

  const processedPayments: Payment[] =
    processedPaymentsData?.getAllPayments.map((payment) => ({
      id: payment.id,
      amount: payment.amount,
      date: new Date(payment.createdAt),
      processed: payment.processed,
      game: undefined,
      type: PaymentType.SCRAPED,
      paymentMethod: payment.provider,
      userIdentifier: payment.senderName,
    })) ?? [];
  const pendingPayments: Payment[] =
    pendingPaymentsData?.getAllPayments.map((payment) => ({
      id: payment.id,
      amount: payment.amount,
      date: new Date(payment.createdAt),
      processed: payment.processed,
      game: undefined,
      type: PaymentType.SCRAPED,
      paymentMethod: payment.provider,
      userIdentifier: payment.senderName,
    })) ?? [];
  const processedUserPayments: Payment[] =
    processedUserPaymentsData?.getUserPayments.map((payment) => {
      const userIdentifier = () => {
        if (!payment.user) {
          return payment.paymentIdentifier;
        }
        if (payment.user.username) {
          return payment.user.username;
        }
        return `${payment.user.firstName} ${payment.user.lastName}`;
      };
      return {
        id: payment.id,
        amount: payment.amount,
        date: new Date(payment.createdAt),
        processed: payment.processed,
        game: payment.gameType,
        type: PaymentType.USER_SUBMITTED,
        paymentMethod: payment.paymentProvider,
        userIdentifier: userIdentifier(),
      };
    }) ?? [];
  const pendingUserPayments: Payment[] =
    pendingUserPaymentsData?.getUserPayments.map((payment) => {
      const userIdentifier = () => {
        if (!payment.user) {
          return payment.paymentIdentifier;
        }
        if (payment.user.username) {
          return payment.user.username;
        }
        return `${payment.user.firstName} ${payment.user.lastName}`;
      };
      return {
        id: payment.id,
        amount: payment.amount,
        date: new Date(payment.createdAt),
        processed: payment.processed,
        game: payment.gameType,
        type: PaymentType.USER_SUBMITTED,
        paymentMethod: payment.paymentProvider,
        userIdentifier: userIdentifier(),
      };
    }) ?? [];

  const allPendingPayments = [...pendingPayments, ...pendingUserPayments];
  const allProcessedPayments = [...processedPayments, ...processedUserPayments];

  const columns: ColumnDef<Payment>[] = [
    {
      header: 'Customer',
      accessorKey: 'userIdentifier',
      cell: ({ getValue }) => {
        return (
          <div>
            <Text type="body-sm" className={'text-brand-500 leading-5'}>
              {getValue<Payment['userIdentifier']>()}
            </Text>
          </div>
        );
      },
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
      cell: ({ getValue }) => {
        return (
          <div>
            <Text type="body-sm">${`${getValue<Payment['amount']>()}`}</Text>
          </div>
        );
      },
    },
    {
      header: 'Game',
      accessorKey: 'game',
      cell: ({ getValue }) => {
        const game = getValue<Payment['game']>();
        return (
          <div>
            {game ? (
              <Badge
                className="text-gray-600"
                size="small"
                variant={getBadgeVariantForGame(game)}
              >
                {game}
              </Badge>
            ) : (
              <Text type="body-sm">Not found.</Text>
            )}
          </div>
        );
      },
    },
    {
      header: 'Payment Method',
      accessorKey: 'paymentMethod',
      cell: ({ getValue }) => {
        const paymentMethod = getValue<Payment['paymentMethod']>();
        return (
          <div>
            <Badge
              className="text-gray-600"
              size="small"
              variant={findBadgeVariantFromPaymentType(paymentMethod)}
            >
              {paymentMethod}
            </Badge>
          </div>
        );
      },
    },
    {
      header: 'Type',
      accessorKey: 'type',
      cell: ({ getValue }) => {
        const type = getValue<Payment['type']>();
        return (
          <div>
            <Badge
              className="text-gray-600"
              size="small"
              variant={
                type === PaymentType.USER_SUBMITTED ? 'primary' : 'danger'
              }
            >
              {type === PaymentType.USER_SUBMITTED ? 'User' : 'Scraped'}
            </Badge>
          </div>
        );
      },
    },
    {
      header: 'Date',
      accessorKey: 'date',
      cell: ({ getValue }) => {
        return (
          <div>
            <Text type="body-sm">
              {format(getValue<Payment['date']>(), 'MM/dd/yyyy hh:mm')}
            </Text>
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const { processed } = row.original;
        return (
          <div className={`${PREFIX}-table-actions-wrapper`}>
            <InteractableComponent
              onPress={() => {
                if (processed) {
                  console.log('undo processed');
                } else {
                  console.log('mark as processed');
                }
              }}
            >
              {processed ? (
                <ReverseArrowSvg />
              ) : (
                <CircleCheckMarkSvg width={24} height={24} />
              )}
            </InteractableComponent>
            <InteractableComponent
              onPress={() => {
                console.log('delete payment');
                // updateUserId(row.original.id);
              }}
            >
              <TrashCanSvg />
            </InteractableComponent>
          </div>
        );
      },
    },
  ];

  const isPendingTableLoading =
    pendingPaymentsLoading || pendingUserPaymentsLoading;
  const isProcessedTableLoading =
    processedPaymentsLoading || processedUserPaymentsLoading;

  return (
    <div className="flex flex-col gap-[24px] justify-center mx-[20%]">
      <Text className="text-white" type="h2">
        Pending Payments
      </Text>
      <DataTable
        isLoading={isPendingTableLoading}
        data={allPendingPayments}
        columns={columns}
        isLeftMostColumnSticky
        isRightMostColumnSticky
        onRowPress={console.log}
      />
      <Text className="text-white" type="h2">
        Processed Payments
      </Text>
      <DataTable
        isLoading={isProcessedTableLoading}
        data={allProcessedPayments}
        columns={columns}
        isLeftMostColumnSticky
        isRightMostColumnSticky
        onRowPress={console.log}
      />
    </div>
  );
}
