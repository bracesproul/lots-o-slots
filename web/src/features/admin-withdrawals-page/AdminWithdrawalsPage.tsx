import { ReactElement } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { DashboardPageHeader } from '@/features';
import { PageType, PaymentProvider } from '@/types';
import { GameType, WithdrawalRequestStatus } from '@/generated/graphql';
import { DataTable, Text, Badge, InteractableComponent } from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { findBadgeVariantFromPaymentType } from '../play-now-dialog-depd/utils';
import { CircleCheckMarkSvg, CircleXSvg, ReverseArrowSvg } from '@/assets';
import {
  useGetWithdrawalRequestsQuery,
  useUpdateWithdrawalRequestStatusMutation,
} from '@/generated/graphql';

export type AdminWithdrawalsPageProps = {
  /** Columns to display on the data table */
  pendingColumns: ColumnDef<Withdrawal>[];
  approvedColumns: ColumnDef<Withdrawal>[];
  rejectedColumns: ColumnDef<Withdrawal>[];
  /** Data to display on the data table */
  pendingWithdrawals: Withdrawal[];
  approvedWithdrawals: Withdrawal[];
  rejectedWithdrawals: Withdrawal[];
  /** Whether or not the data is loading */
  isLoading: boolean;
};

const PREFIX = StylePrefix.ADMIN_PAYMENTS_PAGE;

function AdminWithdrawalsPage(props: AdminWithdrawalsPageProps): ReactElement {
  const p = { ...props };
  return (
    <div className={`${PREFIX}`}>
      <DashboardPageHeader includePageNav page={PageType.ADMIN_WITHDRAWALS} />
      <div className="flex flex-col justify-center mx-[20%] gap-[24px]">
        <Text className="text-white" type="h2">
          Pending
        </Text>
        <DataTable
          isLoading={p.isLoading}
          data={p.pendingWithdrawals}
          columns={p.pendingColumns}
          isLeftMostColumnSticky
          isRightMostColumnSticky
          onRowPress={console.log}
        />
        <Text className="text-white" type="h2">
          Approved
        </Text>
        <DataTable
          isLoading={p.isLoading}
          data={p.approvedWithdrawals}
          columns={p.approvedColumns}
          isLeftMostColumnSticky
          isRightMostColumnSticky
          onRowPress={console.log}
        />{' '}
        <Text className="text-white" type="h2">
          Rejected
        </Text>
        <DataTable
          isLoading={p.isLoading}
          data={p.rejectedWithdrawals}
          columns={p.rejectedColumns}
          isLeftMostColumnSticky
          isRightMostColumnSticky
          onRowPress={console.log}
        />
      </div>
    </div>
  );
}

export type Withdrawal = {
  id: string;
  amount: number;
  date: Date;
  status: WithdrawalRequestStatus;
  paymentMethod: PaymentProvider;
  payoutAddress: string;
};

const getBadgeVariantForWithdrawalStatus = (
  status: WithdrawalRequestStatus
) => {
  if (!status) return 'warning';
  switch (status) {
    case WithdrawalRequestStatus.PENDING:
      return 'warning';
    case WithdrawalRequestStatus.APPROVED:
      return 'success';
    case WithdrawalRequestStatus.REJECTED:
      return 'danger';
    default:
      throw new Error('Invalid status');
  }
};

export default function AdminWithdrawalsPageContainer(): ReactElement {
  const { data, loading } = useGetWithdrawalRequestsQuery();
  const [updateWithdrawalRequestStatus] =
    useUpdateWithdrawalRequestStatusMutation();
  const pendingWithdrawals: Withdrawal[] = [];
  const approvedWithdrawals: Withdrawal[] = [];
  const rejectedWithdrawals: Withdrawal[] = [];

  data?.getAllWithdrawalRequests.forEach((withdrawal) => {
    const withdrawalData = {
      id: withdrawal.id,
      amount: withdrawal.amount,
      date: new Date(withdrawal.createdAt),
      status: withdrawal.status,
      paymentMethod: withdrawal.payoutMethod,
      payoutAddress: withdrawal.payoutAddress,
    };
    if (withdrawal.status === WithdrawalRequestStatus.PENDING) {
      pendingWithdrawals.push(withdrawalData);
    } else if (withdrawal.status === WithdrawalRequestStatus.APPROVED) {
      approvedWithdrawals.push(withdrawalData);
    } else {
      rejectedWithdrawals.push(withdrawalData);
    }
  }) ?? [];

  const baseColumns: ColumnDef<Withdrawal>[] = [
    {
      header: 'Payout Address',
      accessorKey: 'payoutAddress',
      cell: ({ getValue }) => {
        return (
          <div>
            <Text type="body-sm" className={'leading-5'}>
              {getValue<Withdrawal['payoutAddress']>()}
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
            <Text type="body-sm">${`${getValue<Withdrawal['amount']>()}`}</Text>
          </div>
        );
      },
    },
    {
      header: 'Payment Method',
      accessorKey: 'paymentMethod',
      cell: ({ getValue }) => {
        return (
          <div>
            <Badge
              className="text-gray-600"
              size="small"
              variant={findBadgeVariantFromPaymentType(
                getValue<Withdrawal['paymentMethod']>()
              )}
            >
              {getValue<Withdrawal['paymentMethod']>()}
            </Badge>
          </div>
        );
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ getValue }) => {
        const status = getValue<Withdrawal['status']>();
        return (
          <div>
            <Badge
              className="text-gray-600"
              size="small"
              variant={getBadgeVariantForWithdrawalStatus(status)}
            >
              {status}
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
              {format(getValue<Withdrawal['date']>(), 'MM/dd/yyyy hh:mm')}
            </Text>
          </div>
        );
      },
    },
  ];

  const pendingColumns: ColumnDef<Withdrawal>[] = [
    ...baseColumns,
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div className={`${PREFIX}-table-actions-wrapper`}>
            <InteractableComponent
              onPress={() => {
                handleUpdateWithdrawalRequestStatus(
                  id,
                  WithdrawalRequestStatus.APPROVED
                );
              }}
            >
              <CircleCheckMarkSvg width={24} height={24} />
            </InteractableComponent>
            <InteractableComponent
              onPress={() => {
                handleUpdateWithdrawalRequestStatus(
                  id,
                  WithdrawalRequestStatus.REJECTED
                );
              }}
            >
              <CircleXSvg />
            </InteractableComponent>
          </div>
        );
      },
    },
  ];

  const approvedColumns: ColumnDef<Withdrawal>[] = [
    ...baseColumns,
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div className={`${PREFIX}-table-actions-wrapper`}>
            <InteractableComponent
              onPress={() => {
                handleUpdateWithdrawalRequestStatus(
                  id,
                  WithdrawalRequestStatus.PENDING
                );
              }}
            >
              <ReverseArrowSvg />
            </InteractableComponent>
            <InteractableComponent
              onPress={() => {
                handleUpdateWithdrawalRequestStatus(
                  id,
                  WithdrawalRequestStatus.REJECTED
                );
              }}
            >
              <CircleXSvg />
            </InteractableComponent>
          </div>
        );
      },
    },
  ];

  const rejectedColumns: ColumnDef<Withdrawal>[] = [
    ...baseColumns,
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div className={`${PREFIX}-table-actions-wrapper`}>
            <InteractableComponent
              onPress={() => {
                handleUpdateWithdrawalRequestStatus(
                  id,
                  WithdrawalRequestStatus.PENDING
                );
              }}
            >
              <ReverseArrowSvg />
            </InteractableComponent>
            <InteractableComponent
              onPress={() => {
                handleUpdateWithdrawalRequestStatus(
                  id,
                  WithdrawalRequestStatus.APPROVED
                );
              }}
            >
              <CircleCheckMarkSvg width={24} height={24} />
            </InteractableComponent>
          </div>
        );
      },
    },
  ];

  const handleUpdateWithdrawalRequestStatus = async (
    id: string,
    status: WithdrawalRequestStatus
  ) => {
    await updateWithdrawalRequestStatus({
      variables: {
        input: {
          id,
          status,
        },
      },
      refetchQueries: ['GetWithdrawalRequests'],
    });
  };

  return (
    <AdminWithdrawalsPage
      pendingColumns={pendingColumns}
      approvedColumns={approvedColumns}
      rejectedColumns={rejectedColumns}
      pendingWithdrawals={pendingWithdrawals}
      approvedWithdrawals={approvedWithdrawals}
      rejectedWithdrawals={rejectedWithdrawals}
      isLoading={loading}
    />
  );
}