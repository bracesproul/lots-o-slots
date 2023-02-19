import { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components';
import { ArrowRight } from '@/assets';
import { TableType } from '@/types/page-change';
import {
  useGetAllPaymentsQuery,
  PaymentProvider,
  useMarkPaymentAsProcessedMutation,
} from '@/generated/graphql';
import Undo from '@/assets/svgs/Undo';
import { StylePrefix } from '@/types/style-prefix';

export type PaymentTableData = {
  paymentProvider: PaymentProvider;
  name: string;
  username: string;
  amount: number;
  id: string;
};

export type PaymentsTableProps = {
  className?: string;

  data: PaymentTableData[];
  loading: boolean;

  /** Whether or not to show the action column. */
  includeProcessPaymentColumn?: boolean;

  /** Column to handle undoing marking the payment as processed. */
  includeUndoColumn?: boolean;

  /** The type of the table. */
  tableType: TableType;

  /** Function to handle processing payments. */
  handleProcessingPayment?: (id: string, processed: boolean) => void;
};

type ActionCellProps = {
  id: string;
  onPress: (id: string) => void;
  icon: ReactElement | ReactNode;
};

const PREFIX = StylePrefix.PAYMENTS_TABLE;

function ActionCell(props: ActionCellProps): ReactElement {
  const { onPress, id, icon } = props;

  return (
    <a onClick={() => onPress(id)}>
      <div className={`${PREFIX}-action-cell-container`}>
        <Icon className={'pm-[5px] my-[2px]'} content={icon} size="medium" />
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
              <th>Name</th>
              <th>Username</th>
              <th>Amount</th>
              <th>Payment</th>
              {p.includeProcessPaymentColumn && <th>Actions</th>}
              {p.includeUndoColumn && <th>Undo</th>}
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
                <th className={`${PREFIX}-th`}>{row.name}</th>
                <th className={`${PREFIX}-th`}>{row.username}</th>
                <th className={`${PREFIX}-th`}>
                  ${row.amount.toLocaleString()}
                </th>
                <th className={`${PREFIX}-th`}>{row.paymentProvider}</th>
                {p.includeProcessPaymentColumn && (
                  <th className={`${PREFIX}-th`}>
                    <ActionCell
                      id={row.id}
                      onPress={(id) => p.handleProcessingPayment?.(id, true)}
                      icon={<ArrowRight />}
                    />
                  </th>
                )}
                {p.includeUndoColumn && (
                  <th className={`${PREFIX}-th`}>
                    <ActionCell
                      id={row.id}
                      onPress={(id) => p.handleProcessingPayment?.(id, false)}
                      icon={<Undo />}
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
  const [markPaymentAsProcessed] = useMarkPaymentAsProcessedMutation();

  const {
    data: pendingData,
    loading: pendingLoading,
    refetch: refetchPending,
  } = useGetAllPaymentsQuery({
    variables: {
      input: {
        processed: false,
      },
    },
    pollInterval: 15000, // 15 sec
  });

  const {
    data: processedData,
    loading: processedLoading,
    refetch: refetchProcessed,
  } = useGetAllPaymentsQuery({
    variables: {
      input: {
        processed: true,
      },
    },
  });

  const processedPayments: PaymentTableData[] =
    processedData?.getAllPayments.map((data) => {
      return {
        id: data.id,
        paymentProvider: data.provider,
        username: 'Todo',
        amount: data.amount,
        name: data.senderName,
      };
    }) ?? [];

  const pendingPayments: PaymentTableData[] =
    pendingData?.getAllPayments.map((data) => {
      return {
        id: data.id,
        paymentProvider: data.provider,
        username: 'Todo',
        amount: data.amount,
        name: data.senderName,
      };
    }) ?? [];

  const handlePaymentProcessing = async (id: string, processed: boolean) => {
    const index = pendingPayments.findIndex((item) => item.id === id);

    if (index !== -1) {
      const foundItem = pendingPayments.splice(index, 1)[0];
      processedPayments.unshift(foundItem);
    }

    await markPaymentAsProcessed({
      variables: {
        input: {
          id,
          processed,
        },
      },
    });

    // refetching the prev queries.
    refetchPending({
      input: {
        processed: false,
      },
    });
    refetchProcessed({
      input: {
        processed: true,
      },
    });
  };

  return (
    <>
      <PaymentsTable
        loading={pendingLoading}
        handleProcessingPayment={handlePaymentProcessing}
        includeProcessPaymentColumn
        data={pendingPayments}
        tableType={TableType.PENDING}
      />
      <PaymentsTable
        loading={processedLoading}
        tableType={TableType.PROCESSED}
        data={processedPayments}
        includeUndoColumn
        handleProcessingPayment={handlePaymentProcessing}
      />
    </>
  );
}
