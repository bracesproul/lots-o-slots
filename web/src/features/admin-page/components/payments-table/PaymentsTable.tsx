import { ReactElement } from 'react';
import clsx from 'clsx';
import { Icon, InteractableComponent } from '@/components';
import { ArrowRight, RightArrowButton } from '@/assets';
import { PageChangeType, TableType } from '@/types/page-change';

// @TODO Replace with import from graphql once codegen init.
export enum PaymentProvider {
  PAYPAL = 'PAYPAL',
  CASHAPP = 'CASHAPP',
  ZELLE = 'ZELLE',
}

export enum Platform {
  SLOTS = 'SLOTS',
  POKER = 'POKER',
}

export type PaymentTableData = {
  paymentProvider: PaymentProvider;
  username: string;
  amount: number;
  platform: Platform;
  id: string;
};

export type PaymentsTableProps = {
  className?: string;

  data: PaymentTableData[];

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

export default function PaymentsTable(props: PaymentsTableProps): ReactElement {
  const p = { ...props };

  const title =
    p.tableType === TableType.PENDING
      ? 'Pending Payments'
      : 'Processed Payments';

  return (
    <div className={clsx(`${PREFIX}-container`)}>
      <h1 className={`${PREFIX}-title`}>{title}</h1>
      <table className={'payments-table'}>
        <thead className={`${PREFIX}-header`}>
          <tr className={`${PREFIX}-header-row`}>
            <th>Platform</th>
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
              <th className={`${PREFIX}-th`}>{row.platform}</th>
              <th className={`${PREFIX}-th`}>{row.username}</th>
              <th className={`${PREFIX}-th`}>{row.amount}</th>
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
      <div className={`${PREFIX}-pagination-container`}>
        <InteractableComponent
          onPress={() => p.handlePageChange(PageChangeType.LEFT, p.tableType)}
        >
          <Icon
            size="xlarge"
            className="text-white rotate-180"
            content={<RightArrowButton />}
          />
        </InteractableComponent>
        <InteractableComponent
          onPress={() => p.handlePageChange(PageChangeType.RIGHT, p.tableType)}
        >
          <Icon
            size="xlarge"
            className="text-white"
            content={<RightArrowButton />}
          />
        </InteractableComponent>
      </div>
    </div>
  );
}
