import { FormEvent, ReactElement, useMemo, useState } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { ConfirmDeleteDialog, DashboardPageHeader } from '@/features';
import { PageType, PaymentProvider } from '@/types';
import { GameType, PaymentStatus } from '@/generated/graphql';
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
  NotePadPencilSvg,
  RedoCircleSvg,
  ReverseArrowSvg,
  TrashCanSvg,
} from '@/assets';
import {
  useGetEmailLogsQuery,
  useDeleteEmailLogMutation,
} from '@/generated/graphql';
import useSearchQuery, { SearchQueryParam } from '@/hooks/useSearchQuery';
import { AddTransactionForm } from './components';
import clsx from 'clsx';

export type AdminEmailsPageProps = {
  /** The data table columns */
  columns: ColumnDef<Email>[];
  /** The data to display in the emails table */
  emails: Email[];
  /** Whether or not the data is loading */
  isLoading: boolean;
  /** Whether or not the delete modal is open */
  open: boolean;
  /** Handler for setting the delete modal to open */
  setOpen: (open: boolean) => void;
  /** Event handler for deleting an email */
  onDeleteEmail: (e: FormEvent<HTMLFormElement>) => void;
  /** Event handler for setting the query params for a search value */
  setSearchQuery: (search: string, queryParam: SearchQueryParam) => void;
  /** The body of the selected email */
  // selectedEmailBody: string;
  /** Handler function to set the email body when clicking on a row */
};

const PREFIX = StylePrefix.ADMIN_EMAILS_PAGE;

function AdminEmailsPage(props: AdminEmailsPageProps): ReactElement {
  const p = props;
  const [emailBody, setEmailBody] = useState<string>('');

  return (
    <div className={`${PREFIX}`}>
      <DashboardPageHeader includePageNav page={PageType.ADMIN_EMAIL_LIST} />
      <div className={`${PREFIX}-content`}>
        <div className={`${PREFIX}-table-wrapper`}>
          <div className={`${PREFIX}-table-header`}>
            <Text className="text-white" type="h2">
              Unprocessed Emails
            </Text>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // @typescript-eslint/ban-ts-comment
                // eslint-disable-next-line
              // @ts-ignore
                const input = e.target.elements['emailSearch']; // get the input element by its name
                const value = input.value; // get the input value
                p.setSearchQuery(value, SearchQueryParam.EMAIL_LIST);
              }}
              className="flex flex-row gap-[8px] items-center"
            >
              <SearchField
                name="emailSearch"
                aria-label="Search Emails"
                placeholder="Search"
              />
              <Button variant="secondary" size="xsmall" type="submit">
                Submit
              </Button>
            </form>
          </div>
          <DataTable
            isLoading={p.isLoading}
            data={p.emails}
            columns={p.columns}
            isLeftMostColumnSticky
            isRightMostColumnSticky
            onRowPress={(row) => setEmailBody(row.body)}
          />
        </div>
        <AddTransactionForm />
      </div>
      <div
        className={clsx(`${PREFIX}-email-body-content`, {
          'is-hidden': emailBody === '',
        })}
      >
        <Text className={'w-[90%] flex items-center'}>{emailBody}</Text>
      </div>
      <ConfirmDeleteDialog
        name="email"
        open={p.open}
        setOpen={p.setOpen}
        onSubmit={p.onDeleteEmail}
      />
    </div>
  );
}

export type Email = {
  id: string;
  subject: string;
  body: string;
  date: Date;
};

export default function AdminEmailsPageContainer(): ReactElement {
  const [open, setOpen] = useState(false);
  const [selectedEmailId, setSelectedEmailId] = useState<string>('');
  const [deleteEmailLog] = useDeleteEmailLogMutation();
  const { addSearchQueryParam, getQueryParams } = useSearchQuery();
  const emailListSearchQuery = getQueryParams(SearchQueryParam.EMAIL_LIST);
  const { data, loading } = useGetEmailLogsQuery({
    variables: {
      input: {
        hasTransactions: false,
      },
    },
  });
  const allEmails: Email[] =
    data?.getAllEmailLogs?.map((email) => ({
      id: email.id,
      subject: email.subject,
      body: email.body,
      date: new Date(email.receivedAt),
    })) ?? [];

  const columns: ColumnDef<Email>[] = [
    {
      header: 'Subject',
      accessorKey: 'subject',
      cell: ({ getValue }) => {
        return (
          <div>
            <Text type="body-sm" className={'text-brand-500 leading-5'}>
              {getValue<Email['subject']>()}
            </Text>
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
              {format(getValue<Email['date']>(), 'MM/dd/yyyy hh:mm')}
            </Text>
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const { id, body } = row.original;
        return (
          <div className={`${PREFIX}-table-actions-wrapper`}>
            <InteractableComponent
              onPress={() => {
                setOpen(true);
                setSelectedEmailId(id);
              }}
            >
              <TrashCanSvg />
            </InteractableComponent>
          </div>
        );
      },
    },
  ];

  const onDeleteEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    deleteEmailLog({
      variables: {
        id: selectedEmailId,
      },
      refetchQueries: ['GetEmailLogs'],
    });
    setSelectedEmailId('');
    setOpen(false);
  };

  const setSearchQuery = (search: string, queryParam: SearchQueryParam) => {
    const params = encodeURIComponent(search);
    addSearchQueryParam([params], queryParam);
  };

  const filteredPendingData = useMemo(() => {
    if (!emailListSearchQuery) {
      return allEmails;
    }
    const query = decodeURIComponent(emailListSearchQuery[0]);
    return allEmails.filter((email) => {
      return Object.values(email).some((value) => {
        return (
          value && value.toString().toLowerCase().includes(query.toLowerCase())
        );
      });
    });
  }, [allEmails, emailListSearchQuery]);

  return (
    <AdminEmailsPage
      columns={columns}
      emails={filteredPendingData}
      isLoading={loading}
      open={open}
      setOpen={setOpen}
      setSearchQuery={setSearchQuery}
      onDeleteEmail={onDeleteEmail}
    />
  );
}
