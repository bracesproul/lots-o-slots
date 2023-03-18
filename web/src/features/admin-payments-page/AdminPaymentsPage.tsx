import { FormEvent, ReactElement, useMemo, useState } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { ConfirmDeleteDialog, DashboardPageHeader } from '@/features';
import { PageType, PaymentProvider } from '@/types';
import { GameType } from '@/generated/graphql';
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
import { CircleCheckMarkSvg, ReverseArrowSvg, TrashCanSvg } from '@/assets';
import {
  useGetProcessedPaymentsQuery,
  useGetPendingPaymentsQuery,
  useGetProcessedUserPaymentsQuery,
  useGetPendingUserPaymentsQuery,
  useUpdatePaymentStatusMutation,
  useUpdateUserPaymentStatusMutation,
  useDeletePaymentMutation,
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
            Pending Payments
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
            Processed Payments
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

export default function AdminPaymentsPageContainer(): ReactElement {
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
  const [updatePaymentStatus] = useUpdatePaymentStatusMutation();
  const [updateUserPaymentStatus] = useUpdateUserPaymentStatusMutation();
  const [deletePayment] = useDeletePaymentMutation();
  const [deleteUserPayment] = useDeleteUserPaymentMutation();
  const [open, setOpen] = useState(false);
  const [paymentIdToDelete, setPaymentIdToDelete] = useState('');
  const [paymentTypeToDelete, setPaymentTypeToDelete] = useState<PaymentType>();

  const { addSearchQueryParam, getQueryParams } = useSearchQuery();
  const pendingSearchQuery = getQueryParams(SearchQueryParam.PENDING_PAYMENTS);
  const processedSearchQuery = getQueryParams(
    SearchQueryParam.PROCESSED_PAYMENTS
  );

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

  const isPendingTableLoading =
    pendingPaymentsLoading || pendingUserPaymentsLoading;
  const isProcessedTableLoading =
    processedPaymentsLoading || processedUserPaymentsLoading;

  const onDeletePayment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (paymentTypeToDelete === PaymentType.USER_SUBMITTED) {
      await deleteUserPayment({
        variables: {
          id: paymentIdToDelete,
        },
        refetchQueries: [
          'GetProcessedPayments',
          'GetPendingPayments',
          'GetProcessedUserPayments',
          'GetPendingUserPayments',
        ],
      });
    } else {
      const { data, errors } = await deletePayment({
        variables: {
          id: paymentIdToDelete,
        },
        refetchQueries: [
          'GetProcessedPayments',
          'GetPendingPayments',
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
          'GetProcessedPayments',
          'GetPendingPayments',
          'GetProcessedUserPayments',
          'GetPendingUserPayments',
        ],
      });
    } else {
      await updatePaymentStatus({
        variables: {
          input: {
            id,
            processed,
          },
        },
        refetchQueries: [
          'GetProcessedPayments',
          'GetPendingPayments',
          'GetProcessedUserPayments',
          'GetPendingUserPayments',
        ],
      });
    }
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
      handleDeleteAccount={onDeletePayment}
      open={open}
      setOpen={setOpen}
      setSearchQuery={setSearchQuery}
    />
  );
}
