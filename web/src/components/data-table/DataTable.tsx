import { Button, Checkbox, Text, Select } from '@/components';
import { useScrolledOnScreen } from '@/hooks';
import { StylePrefix } from '@/types';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  RowSelectionState,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { ReactElement, useEffect, useRef, useState } from 'react';

export type DataTableProps<T> = {
  /** Optional style prop for overriding the default styles. */
  className?: string;

  /** Data for table */
  data: T[];

  /** Columns for table */
  columns: ColumnDef<T>[];

  /** Whether the data table is loading */
  isLoading?: boolean;

  /**
   * Whether the backend has more results
   * than what's currently loaded in the table
   * @default false
   */
  hasMore?: boolean;

  /**
   * Whether the backend is loading more results
   */
  isLoadingMore?: boolean;

  /**
   * Handler to call when the user takes an action that calls for
   * loading more data, like reaching the bottom of the table
   * or pressing a pagination button.
   */
  onLoadMore?: () => void;

  /**
   * Whether to show pagination controls
   * @default false
   */
  showPagination?: boolean;

  /**
   * Handler that gets called when the selection gets updated
   * @default false
   */
  onSelectionChange?: (rowSelection: RowSelectionState) => void;

  /**
   * Whether the left most column is sticky
   * @default false
   */
  isLeftMostColumnSticky?: boolean;

  /**
   * Whether the right most column is sticky
   * @default false
   */
  isRightMostColumnSticky?: boolean;

  /** Handler to call when a row is pressed */
  onRowPress: (row: T) => void;
};

const PREFIX = StylePrefix.DATA_TABLE;

// util components

type PaginationButtonProps<T> = {
  table: Table<T>;
};

const POSSIBLE_PAGE_SIZES = [5, 10, 20, 30, 40, 50];

const PaginationButtons = <T,>(
  props: PaginationButtonProps<T>
): ReactElement => {
  const { table } = props;

  return (
    <div className={`${PREFIX}-pagination`}>
      <Button
        className={`${PREFIX}-pagination-button`}
        onPress={() => table.setPageIndex(0)}
        isDisabled={!table.getCanPreviousPage()}
        size="xsmall"
      >
        {'<<'}
      </Button>
      <Button
        className={`${PREFIX}-pagination-button`}
        onPress={() => table.previousPage()}
        isDisabled={!table.getCanPreviousPage()}
        size="xsmall"
      >
        {'<'}
      </Button>
      <Button
        className={`${PREFIX}-pagination-button`}
        onPress={() => table.nextPage()}
        isDisabled={!table.getCanNextPage()}
        size="xsmall"
      >
        {'>'}
      </Button>
      <Button
        className={`${PREFIX}-pagination-button`}
        onPress={() => table.setPageIndex(table.getPageCount() - 1)}
        isDisabled={!table.getCanNextPage()}
        size="xsmall"
      >
        {'>>'}
      </Button>
      <Text type="body-md" className={`${PREFIX}-page-info`}>
        Page {`${table.getState().pagination.pageIndex + 1}`} of{' '}
        {`${table.getPageCount()}`}
      </Text>
      <Select
        value={table.getState().pagination.pageSize}
        onChange={(value) => table.setPageSize(value as number)}
        className={`${PREFIX}-pageSize-selector`}
        options={POSSIBLE_PAGE_SIZES}
        placeholder={'Page Size'}
      />
    </div>
  );
};

const DEFAULT_PROPS = {
  hasMore: false,
  showPagination: false,
  isLeftMostColumnSticky: false,
  isRightMostColumnSticky: false,
};

function DataTable<T>(props: DataTableProps<T>) {
  const p = { ...DEFAULT_PROPS, ...props };
  const { onSelectionChange, onRowPress, isLoading } = p;
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable<T>({
    data: p.data,
    columns: [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              isIndeterminate: table.getIsSomeRowsSelected(),
              onCheckedChange: (e: any) => {
                if (typeof e === 'boolean') {
                  table.toggleAllRowsSelected(e);
                }
              },
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <Checkbox
              {...{
                checked: row.getIsSelected(),
                isIndeterminate: row.getIsSomeSelected(),
                onCheckedChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      ...p.columns,
    ],
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: process.env.NODE_ENV !== 'production',
  });

  // We're controlling scroll shadows by observing an empty div
  // Inspired by https://cushionapp.com/journal/overflow-shadows-using-the-intersection-observer-api
  const tableLeftStartRef = useRef<HTMLTableRowElement>(null);
  const { isIntersecting: isIntersectingTableLeft } = useScrolledOnScreen({
    ref: tableLeftStartRef,
  });

  const tableRightEndRef = useRef<HTMLDivElement>(null);
  const { isIntersecting: isIntersectingTableRight } = useScrolledOnScreen({
    ref: tableRightEndRef,
  });

  const tableRowsEndRef = useRef<HTMLDivElement>(null);
  const { isIntersecting: _isIntersectingRowsEnd } = useScrolledOnScreen({
    ref: tableRowsEndRef,
    onIntersection: () => {
      if (p.hasMore && !p.isLoadingMore) {
        p.onLoadMore?.();
      }
    },
  });

  useEffect(() => {
    onSelectionChange?.(rowSelection);
  }, [rowSelection]);

  return (
    <div
      className={clsx(
        PREFIX,
        {
          'is-intersecting-left': isIntersectingTableLeft,
          'is-intersecting-right': isIntersectingTableRight,
          'is-left-most-column-sticky': p.isLeftMostColumnSticky,
          'is-right-most-column-sticky': p.isRightMostColumnSticky,
        },
        p.className
      )}
    >
      {p.showPagination && <PaginationButtons table={table} />}
      <div className={`${PREFIX}-container`}>
        <div className={`${PREFIX}-table-with-left-ref`}>
          <div ref={tableLeftStartRef} />
          <table className={`${PREFIX}-table`}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className={`${PREFIX}-header-row`}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className={`${PREFIX}-header-cell`}
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading ? (
                <tr className={`${PREFIX}-body-row`}>
                  <td colSpan={10} className={`${PREFIX}-cell`}>
                    Loading...
                  </td>
                </tr>
              ) : (
                (p.showPagination
                  ? table.getPaginationRowModel()
                  : table.getCoreRowModel()
                ).rows.map((row) => {
                  return (
                    <tr
                      key={row.id}
                      className={`${PREFIX}-body-row`}
                      onClick={(event) => {
                        const { target } = event;
                        const t = target as any; // shady, but taking advantage of the fact we know a role attribute will be on HTML elements
                        if (t?.role !== 'checkbox') {
                          event?.stopPropagation();
                          onRowPress(row.original);
                        }
                      }}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td key={cell.id} className={`${PREFIX}-cell`}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
              <tr>
                <td colSpan={10}>
                  <div ref={tableRowsEndRef} />
                  {p.isLoadingMore && <div>Loading...</div>}
                </td>
              </tr>
            </tbody>
          </table>
          <div ref={tableRightEndRef} />
        </div>
      </div>
    </div>
  );
}

export default DataTable;
