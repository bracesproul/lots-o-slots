import { FormEvent, ReactElement, useMemo, useState } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { ConfirmDeleteDialog, DashboardPageHeader } from '@/features';
import { PageType, PaymentProvider } from '@/types';
import {
  GameType,
  PaymentStatus,
  useGetWithdrawalRequestsQuery,
  useUpdateWithdrawalRequestStatusMutation,
  WithdrawalRequestStatus,
} from '@/generated/graphql';
import {
  DataTable,
  Badge,
  InteractableComponent,
  Text,
  SearchField,
  Button,
} from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { findBadgeVariantFromPaymentType } from '../play-now-dialog-depd/utils';
import {
  CircleCheckMarkSvg,
  CircleXSvg,
  ReverseArrowSvg,
  TrashCanSvg,
} from '@/assets';
import {
  useGetProcessedTransactionsQuery,
  useGetPendingTransactionsQuery,
  useGetProcessedUserPaymentsQuery,
  useGetPendingUserPaymentsQuery,
  useUpdateTransactionStatusMutation,
  useUpdateUserPaymentStatusMutation,
  useDeleteTransactionMutation,
  useDeleteUserPaymentMutation,
} from '@/generated/graphql';
import useSearchQuery, { SearchQueryParam } from '@/hooks/useSearchQuery';

export type AdminPaymentsPageProps = {
  /** The data table columns */
  columns: ColumnDef<Payment>[];
  /** The data to display in the pending payments table */
  pendingPaymentsData: Payment[];
  /** The data to display in the processed payments table */
  processedPaymentsData: Payment[];
  /** Whether or not the pending payments table data is loading */
  isPendingTableLoading: boolean;
  /** Whether or not the processed payments table data is loading */
  isProcessedTableLoading: boolean;
  /** Whether or not the delete payment modal is open */
  open: boolean;
  /** Handler for setting the delete payment modal to open */
  setOpen: (open: boolean) => void;
  /** Event handler for deleting the payment */
  handleDeleteAccount: (e: FormEvent<HTMLFormElement>) => void;
  /** Event handler for setting the query params for a search value */
  setSearchQuery: (search: string, queryParam: SearchQueryParam) => void;
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

function AdminPaymentsPage(props: AdminPaymentsPageProps): ReactElement {
  const p = props;

  return (
    <div className={`${PREFIX}`}>
      <DashboardPageHeader includePageNav page={PageType.ADMIN_PAYMENTS} />
      <div className="flex flex-col gap-[24px] justify-center mx-[20%]">
        <div className={`${PREFIX}-table-header`}>
          <Text className="text-white" type="h2">
            Pending Deposits
          </Text>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // @typescript-eslint/ban-ts-comment
              // eslint-disable-next-line
              // @ts-ignore
              const input = e.target.elements['pendingSearch']; // get the input element by its name
              const value = input.value; // get the input value
              p.setSearchQuery(value, SearchQueryParam.PENDING_PAYMENTS);
            }}
            className="flex flex-row gap-[8px] items-center"
          >
            <SearchField
              name="pendingSearch"
              aria-label="Search Pending Payments"
              placeholder="Search"
            />
            <Button variant="secondary" size="xsmall" type="submit">
              Submit
            </Button>
          </form>
        </div>
        <DataTable
          isLoading={p.isPendingTableLoading}
          data={p.pendingPaymentsData}
          columns={p.columns}
          isLeftMostColumnSticky
          isRightMostColumnSticky
          onRowPress={() => undefined}
        />
        <div className={`${PREFIX}-table-header`}>
          <Text className="text-white" type="h2">
            Pending Withdrawals
          </Text>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // @typescript-eslint/ban-ts-comment
              // eslint-disable-next-line
              // @ts-ignore
              const input = e.target.elements['pendingWithdrawals'];
              const value = input.value;
              p.setSearchQuery(value, SearchQueryParam.PENDING_WITHDRAWALS);
            }}
            className={`${PREFIX}-search-form`}
          >
            <SearchField
              name="pendingWithdrawals"
              aria-label="Search Processed Payments"
              placeholder="Search"
            />
            <Button variant="secondary" size="xsmall" type="submit">
              Submit
            </Button>
          </form>
        </div>
        <DataTable
          isLoading={p.isLoading}
          data={p.pendingWithdrawals}
          columns={p.pendingColumns}
          isLeftMostColumnSticky
          isRightMostColumnSticky
          onRowPress={() => undefined}
        />
        <div className={`${PREFIX}-table-header`}>
          <Text className="text-white" type="h2">
            Processed Deposits
          </Text>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // @typescript-eslint/ban-ts-comment
              // eslint-disable-next-line
              // @ts-ignore
              const input = e.target.elements['processedSearch']; // get the input element by its name
              const value = input.value; // get the input value
              p.setSearchQuery(value, SearchQueryParam.PROCESSED_PAYMENTS);
            }}
            className="flex flex-row gap-[8px] items-center"
          >
            <SearchField
              name="processedSearch"
              aria-label="Search Processed Payments"
              placeholder="Search"
            />
            <Button variant="secondary" size="xsmall" type="submit">
              Submit
            </Button>
          </form>
        </div>
        <DataTable
          isLoading={p.isProcessedTableLoading}
          data={p.processedPaymentsData}
          columns={p.columns}
          isLeftMostColumnSticky
          isRightMostColumnSticky
          onRowPress={() => undefined}
        />
        <div className={`${PREFIX}-table-header`}>
          <Text className="text-white" type="h2">
            Approved Withdrawals
          </Text>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // @typescript-eslint/ban-ts-comment
              // eslint-disable-next-line
              // @ts-ignore
              const input = e.target.elements['approvedWithdrawals'];
              const value = input.value;
              p.setSearchQuery(value, SearchQueryParam.APPROVED_WITHDRAWALS);
            }}
            className={`${PREFIX}-search-form`}
          >
            <SearchField
              name="approvedWithdrawals"
              aria-label="Search Processed Payments"
              placeholder="Search"
            />
            <Button variant="secondary" size="xsmall" type="submit">
              Submit
            </Button>
          </form>
        </div>
        <DataTable
          isLoading={p.isLoading}
          data={p.approvedWithdrawals}
          columns={p.approvedColumns}
          isLeftMostColumnSticky
          isRightMostColumnSticky
          onRowPress={() => undefined}
        />
        <div className={`${PREFIX}-table-header`}>
          <Text className="text-white" type="h2">
            Rejected Withdrawals
          </Text>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // @typescript-eslint/ban-ts-comment
              // eslint-disable-next-line
              // @ts-ignore
              const input = e.target.elements['rejectedWithdrawals'];
              const value = input.value;
              p.setSearchQuery(value, SearchQueryParam.REJECTED_WITHDRAWALS);
            }}
            className={`${PREFIX}-search-form`}
          >
            <SearchField
              name="rejectedWithdrawals"
              aria-label="Search Processed Payments"
              placeholder="Search"
            />
            <Button variant="secondary" size="xsmall" type="submit">
              Submit
            </Button>
          </form>
        </div>
        <DataTable
          isLoading={p.isLoading}
          data={p.rejectedWithdrawals}
          columns={p.rejectedColumns}
          isLeftMostColumnSticky
          isRightMostColumnSticky
          onRowPress={() => undefined}
        />
      </div>
      <ConfirmDeleteDialog
        name="payment"
        open={p.open}
        setOpen={p.setOpen}
        onSubmit={p.handleDeleteAccount}
      />
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

const POLLING_INTERVAL = 30000; // 30 seconds

export default function AdminPaymentsPageContainer(): ReactElement {
  const {
    data: processedTransactionsData,
    loading: processedPaymentsLoading,
    startPolling: startProcessedTxnsPolling,
  } = useGetProcessedTransactionsQuery();
  const {
    data: pendingTransactionsData,
    loading: pendingPaymentsLoading,
    startPolling: startPendingTxnsPolling,
  } = useGetPendingTransactionsQuery();
  const {
    data: processedUserPaymentsData,
    loading: processedUserPaymentsLoading,
    startPolling: startProcessedUserTxnsPolling,
  } = useGetProcessedUserPaymentsQuery();
  const {
    data: pendingUserPaymentsData,
    loading: pendingUserPaymentsLoading,
    startPolling: startPendingUserTxnPolling,
  } = useGetPendingUserPaymentsQuery();
  const {
    data: withdrawalsData,
    loading,
    startPolling: startWithdrawalRequestsPolling,
  } = useGetWithdrawalRequestsQuery();
  const [updateWithdrawalRequestStatus] =
    useUpdateWithdrawalRequestStatusMutation();
  const [updateTransactionStatus] = useUpdateTransactionStatusMutation();
  const [updateUserPaymentStatus] = useUpdateUserPaymentStatusMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();
  const [deleteUserPayment] = useDeleteUserPaymentMutation();
  const [open, setOpen] = useState(false);
  const [paymentIdToDelete, setPaymentIdToDelete] = useState('');
  const [paymentTypeToDelete, setPaymentTypeToDelete] = useState<PaymentType>();

  startWithdrawalRequestsPolling(POLLING_INTERVAL);
  startPendingUserTxnPolling(POLLING_INTERVAL);
  startProcessedUserTxnsPolling(POLLING_INTERVAL);
  startPendingTxnsPolling(POLLING_INTERVAL);
  startProcessedTxnsPolling(POLLING_INTERVAL);

  const { addSearchQueryParam, getQueryParams } = useSearchQuery();
  const pendingSearchQuery = getQueryParams(SearchQueryParam.PENDING_PAYMENTS);
  const processedSearchQuery = getQueryParams(
    SearchQueryParam.PROCESSED_PAYMENTS
  );
  const pendingWithdrawalsSearchQuery = getQueryParams(
    SearchQueryParam.PENDING_WITHDRAWALS
  );
  const approvedSearchQuery = getQueryParams(
    SearchQueryParam.APPROVED_WITHDRAWALS
  );
  const rejectedSearchQuery = getQueryParams(
    SearchQueryParam.REJECTED_WITHDRAWALS
  );
  const pendingWithdrawals: Withdrawal[] = [];
  const approvedWithdrawals: Withdrawal[] = [];
  const rejectedWithdrawals: Withdrawal[] = [];

  withdrawalsData?.getAllWithdrawalRequests.forEach((withdrawal) => {
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

  const processedPayments: Payment[] =
    processedTransactionsData?.getAllTransactions.map((transaction) => ({
      id: transaction.id,
      amount: transaction.amount,
      date: new Date(transaction.createdAt),
      processed: true,
      game: undefined,
      type: PaymentType.SCRAPED,
      paymentMethod: transaction.provider,
      userIdentifier:
        transaction.provider === PaymentProvider.CASHAPP
          ? `$${transaction.senderName}`
          : transaction.senderName,
    })) ?? [];
  const pendingPayments: Payment[] =
    pendingTransactionsData?.getAllTransactions.map((transaction) => ({
      id: transaction.id,
      amount: transaction.amount,
      date: new Date(transaction.createdAt),
      processed: false,
      game: undefined,
      type: PaymentType.SCRAPED,
      paymentMethod: transaction.provider,
      userIdentifier:
        transaction.provider === PaymentProvider.CASHAPP
          ? `$${transaction.senderName}`
          : transaction.senderName,
    })) ?? [];
  const processedUserPayments: Payment[] =
    processedUserPaymentsData?.getUserPayments.map((payment) => {
      const userIdentifier = () => {
        if (!payment.user) {
          return payment.paymentProvider === PaymentProvider.CASHAPP
            ? `$${payment.paymentIdentifier}`
            : payment.paymentIdentifier;
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
          return payment.paymentProvider === PaymentProvider.CASHAPP
            ? `$${payment.paymentIdentifier}`
            : payment.paymentIdentifier;
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

  const filteredPendingWithdrawals = useMemo(() => {
    if (!pendingWithdrawalsSearchQuery || pendingWithdrawals.length === 0) {
      return pendingWithdrawals;
    }
    const query = decodeURIComponent(pendingWithdrawalsSearchQuery[0]);
    return pendingWithdrawals.filter((withdrawal) => {
      return Object.values(withdrawal).some((value) => {
        return (
          value && value.toString().toLowerCase().includes(query.toLowerCase())
        );
      });
    });
  }, [pendingWithdrawals, pendingWithdrawalsSearchQuery]);

  const filteredApprovedWithdrawals = useMemo(() => {
    if (!approvedSearchQuery || approvedWithdrawals.length === 0) {
      return approvedWithdrawals;
    }
    const query = decodeURIComponent(approvedSearchQuery[0]);
    return approvedWithdrawals.filter((withdrawal) => {
      return Object.values(withdrawal).some((value) => {
        return (
          value && value.toString().toLowerCase().includes(query.toLowerCase())
        );
      });
    });
  }, [approvedWithdrawals, approvedSearchQuery]);

  const filteredRejectedWithdrawals = useMemo(() => {
    if (!rejectedSearchQuery || rejectedWithdrawals.length === 0) {
      return rejectedWithdrawals;
    }
    const query = decodeURIComponent(rejectedSearchQuery[0]);
    return rejectedWithdrawals.filter((withdrawal) => {
      return Object.values(withdrawal).some((value) => {
        return (
          value && value.toString().toLowerCase().includes(query.toLowerCase())
        );
      });
    });
  }, [rejectedWithdrawals, rejectedSearchQuery]);

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
              {type === PaymentType.USER_SUBMITTED
                ? 'Deposit Request'
                : 'Email'}
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
              {format(getValue<Payment['date']>(), 'MM/dd/yyyy hh:mm a')}
            </Text>
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const { processed, id, type } = row.original;
        return (
          <div className={`${PREFIX}-table-actions-wrapper`}>
            <InteractableComponent
              onPress={() => {
                onUpdatePaymentStatus(id, !processed, type);
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
                setOpen(true);
                setPaymentTypeToDelete(type);
                setPaymentIdToDelete(id);
              }}
            >
              <TrashCanSvg />
            </InteractableComponent>
          </div>
        );
      },
    },
  ];

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

  const isPendingTableLoading =
    pendingPaymentsLoading || pendingUserPaymentsLoading;
  const isProcessedTableLoading =
    processedPaymentsLoading || processedUserPaymentsLoading;

  const onDeleteTransaction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (paymentTypeToDelete === PaymentType.USER_SUBMITTED) {
      await deleteUserPayment({
        variables: {
          id: paymentIdToDelete,
        },
        refetchQueries: [
          'GetProcessedTransactions',
          'GetPendingTransactions',
          'GetProcessedUserPayments',
          'GetPendingUserPayments',
        ],
      });
    } else {
      const { data, errors } = await deleteTransaction({
        variables: {
          id: paymentIdToDelete,
        },
        refetchQueries: [
          'GetProcessedTransactions',
          'GetPendingTransactions',
          'GetProcessedUserPayments',
          'GetPendingUserPayments',
        ],
      });
    }
    setPaymentIdToDelete('');
    setPaymentTypeToDelete(undefined);
    setOpen(false);
  };

  const onUpdatePaymentStatus = async (
    id: string,
    processed: boolean,
    type: PaymentType
  ) => {
    if (type === PaymentType.USER_SUBMITTED) {
      await updateUserPaymentStatus({
        variables: {
          input: {
            id,
            processed,
          },
        },
        refetchQueries: [
          'GetProcessedTransactions',
          'GetPendingTransactions',
          'GetProcessedUserPayments',
          'GetPendingUserPayments',
        ],
      });
    } else {
      await updateTransactionStatus({
        variables: {
          input: {
            id,
            status: processed ? PaymentStatus.COMPLETED : PaymentStatus.PENDING,
          },
        },
        refetchQueries: [
          'GetProcessedTransactions',
          'GetPendingTransactions',
          'GetProcessedUserPayments',
          'GetPendingUserPayments',
        ],
      });
    }
  };

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

  const setSearchQuery = (search: string, queryParam: SearchQueryParam) => {
    const params = encodeURIComponent(search);
    addSearchQueryParam([params], queryParam);
  };

  const filteredPendingData = useMemo(() => {
    if (!pendingSearchQuery) {
      return allPendingPayments;
    }
    const query = decodeURIComponent(pendingSearchQuery[0]);
    return allPendingPayments.filter((payment) => {
      return Object.values(payment).some((value) => {
        return (
          value && value.toString().toLowerCase().includes(query.toLowerCase())
        );
      });
    });
  }, [allPendingPayments, pendingSearchQuery]);

  const filteredProcessedData = useMemo(() => {
    if (!processedSearchQuery) {
      return allProcessedPayments;
    }
    const query = decodeURIComponent(processedSearchQuery[0]);
    return allProcessedPayments.filter((payment) => {
      return Object.values(payment).some((value) => {
        return (
          value && value.toString().toLowerCase().includes(query.toLowerCase())
        );
      });
    });
  }, [allProcessedPayments, processedSearchQuery]);

  return (
    <AdminPaymentsPage
      columns={columns}
      pendingPaymentsData={filteredPendingData}
      processedPaymentsData={filteredProcessedData}
      isPendingTableLoading={isPendingTableLoading}
      isProcessedTableLoading={isProcessedTableLoading}
      handleDeleteAccount={onDeleteTransaction}
      open={open}
      setOpen={setOpen}
      setSearchQuery={setSearchQuery}
      pendingColumns={pendingColumns}
      approvedColumns={approvedColumns}
      rejectedColumns={rejectedColumns}
      pendingWithdrawals={filteredPendingWithdrawals}
      approvedWithdrawals={filteredApprovedWithdrawals}
      rejectedWithdrawals={filteredRejectedWithdrawals}
      isLoading={loading}
    />
  );
}
