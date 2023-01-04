import { ReactElement } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components';
import { ArrowRight } from '@/assets';
import { TableType } from '@/types/page-change';
import {
  PaymentProvider,
  useMarkUserPaymentAsProcessedMutation,
  useGetUserPaymentsQuery,
} from '@/generated/graphql';
import { format } from 'date-fns';

export type UserPaymentTableData = {
  id: string;
  paymentIdentifier: string;
  createdAt: Date;
  paymentProvider: PaymentProvider;
  amount: number;
  gameType: string;
};

export type PaymentsTableProps = {
  className?: string;

  data: UserPaymentTableData[];
  loading: boolean;

  /**
   * Whether or not to show the action column.
   */
  includeActionColumn?: boolean;

  /**
   * The type of the table.
   */
  tableType: TableType;

  /**
   * Function to handle marking the payment as processed.
   */
  handleMarkProcessed?: (id: string) => void;
};

type ActionCellProps = Pick<PaymentsTableProps, 'handleMarkProcessed'> & {
  id: string;
};

const PREFIX = 'user-payments-table';

function ActionCell(props: ActionCellProps): ReactElement {
  const { handleMarkProcessed, id } = props;
  if (!handleMarkProcessed) {
    return <></>;
  }
  return (
    <a onClick={() => handleMarkProcessed(id)}>
      <div className={`${PREFIX}-action-cell-container`}>
        <Icon
          className={'pm-[5px] my-[2px]'}
          content={<ArrowRight />}
          size="medium"
        />
      </div>
    </a>
  );
}

export function UserPaymentsTable(props: PaymentsTableProps): ReactElement {
  const p = { ...props };

  const title =
    p.tableType === TableType.PENDING
      ? 'Pending Payments'
      : 'Processed Payments';

  return (
    <div className={clsx(`${PREFIX}-container`)}>
      <h1 className={`${PREFIX}-title`}>{title}</h1>
      <div className={`${PREFIX}-div-container`}>
        <table className={'payments-table'}>
          <thead className={`${PREFIX}-header`}>
            <tr className={`${PREFIX}-header-row`}>
              <th>Identifier</th>
              <th>Provider</th>
              <th>Amount</th>
              <th>Game</th>
              <th>Date</th>
              {p.includeActionColumn && <th>Actions</th>}
            </tr>
          </thead>
          <tbody className={`${PREFIX}-rows-container`}>
            {p.data.map((row, index) => (
              <tr
                key={row.id}
                className={clsx([
                  `${PREFIX}-row`,
                  {
                    'is-even': index % 2 === 0,
                  },
                ])}
              >
                <th className={`${PREFIX}-th`}>{row.paymentIdentifier}</th>
                <th className={`${PREFIX}-th`}>{row.paymentProvider}</th>
                <th className={`${PREFIX}-th`}>
                  ${row.amount.toLocaleString()}
                </th>
                <th className={`${PREFIX}-th`}>{row.gameType}</th>
                <th className={`${PREFIX}-th`}>
                  {format(row.createdAt, 'MM/dd/yyyy h:mm a')}
                </th>
                {p.includeActionColumn && (
                  <th className={`${PREFIX}-th`}>
                    <ActionCell
                      id={row.id}
                      handleMarkProcessed={p.handleMarkProcessed}
                    />
                  </th>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function UserPaymentsTableContainer(): ReactElement {
  const [markUserPaymentAsProcessed] = useMarkUserPaymentAsProcessedMutation();

  const {
    data: userPaymentData,
    loading: userPaymentLoading,
    refetch: refetchPending,
  } = useGetUserPaymentsQuery({
    variables: {
      input: {
        processed: false,
      },
    },
    pollInterval: 15000, // 15 sec
  });

  const processedPayments: UserPaymentTableData[] =
    userPaymentData?.getUserPayments.map((data) => {
      return {
        id: data.id,
        paymentProvider: data.paymentProvider,
        createdAt: new Date(data.createdAt),
        amount: data.amount,
        gameType: data.gameType.toString(),
        paymentIdentifier: data.paymentIdentifier,
      };
    }) ?? [];

  const handleMarkProcessed = async (id: string) => {
    const index = processedPayments.findIndex((item) => item.id === id);

    if (index !== -1) {
      processedPayments.splice(index, 1)[0];
    }

    await markUserPaymentAsProcessed({
      variables: {
        input: {
          userPaymentId: id,
        },
      },
    });

    // refetching the prev queries.
    refetchPending({
      input: {
        processed: false,
      },
    });
  };

  return (
    <UserPaymentsTable
      loading={userPaymentLoading}
      handleMarkProcessed={handleMarkProcessed}
      includeActionColumn
      data={processedPayments}
      tableType={TableType.PENDING}
    />
  );
}
