import { ReactElement } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components';
import { ArrowRight } from '@/assets';
import { PageChangeType, TableType } from '@/types/page-change';
import { useGetAllPaymentsQuery, PaymentProvider } from '@/generated/graphql';

export type PaymentTableData = {
  paymentProvider: PaymentProvider;
  username: string;
  amount: number;
  id: string;
};

export type PaymentsTableProps = {
  className?: string;

  data: PaymentTableData[];
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

  /**
   * Handle pagination.
   */
  handlePageChange: (direction: PageChangeType, table: TableType) => void;
};

type ActionCellProps = Pick<PaymentsTableProps, 'handleMarkProcessed'> & {
  id: string;
};

const PREFIX = 'payments-table';

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

export function PaymentsTable(props: PaymentsTableProps): ReactElement {
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
              <th>Username</th>
              <th>Amount</th>
              <th>Payment</th>
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
                <th className={`${PREFIX}-th`}>{row.username}</th>
                <th className={`${PREFIX}-th`}>
                  ${row.amount.toLocaleString()}
                </th>
                <th className={`${PREFIX}-th`}>{row.paymentProvider}</th>
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

export default function PaymentsTableContainer(): ReactElement {
  const { data: processedData, loading: processedLoading } =
    useGetAllPaymentsQuery({
      variables: {
        input: {
          processed: true,
        },
      },
    });
  const { data: pendingData, loading: pendingLoading } = useGetAllPaymentsQuery(
    {
      variables: {
        input: {
          processed: false,
        },
      },
    }
  );

  const handlePageChange = (direction: PageChangeType, table: TableType) => {
    console.log('page change:', direction, table);
  };
  const handleMarkProcessed = (id: string) => {
    console.log('marking as processed:', id);
  };

  const processedPayments: PaymentTableData[] =
    processedData?.getAllPayments.map((data) => {
      return {
        id: data.id,
        paymentProvider: data.provider,
        username: data.senderName,
        amount: data.amount,
      };
    }) ?? [];

  const pendingPayments: PaymentTableData[] =
    pendingData?.getAllPayments.map((data) => {
      return {
        id: data.id,
        paymentProvider: data.provider,
        username: data.senderName,
        amount: data.amount,
      };
    }) ?? [];

  console.log('pendingData', pendingData);
  console.log('processedData', processedData);

  return (
    <>
      <PaymentsTable
        loading={pendingLoading}
        handlePageChange={handlePageChange}
        handleMarkProcessed={handleMarkProcessed}
        includeActionColumn
        data={pendingPayments}
        tableType={TableType.PENDING}
      />
      <PaymentsTable
        loading={processedLoading}
        handlePageChange={handlePageChange}
        tableType={TableType.PROCESSED}
        data={processedPayments}
      />
    </>
  );
}
