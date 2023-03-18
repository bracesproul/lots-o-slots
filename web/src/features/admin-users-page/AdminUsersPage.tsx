import { FormEvent, ReactElement, useMemo, useState } from 'react';
import { StylePrefix } from '@/types/style-prefix';
import { DashboardPageHeader, ConfirmDeleteDialog } from '@/features';
import { PageType } from '@/types';
import {
  Badge,
  Button,
  DataTable,
  InteractableComponent,
  SearchField,
  Text,
} from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { UserRole } from '@/generated/graphql';
import { format } from 'date-fns';
import { EditSvg, TrashCanSvg } from '@/assets/svgs';
import { useGetUsersQuery, useDeleteUserMutation } from '@/generated/graphql';
import { getUserFromUserQuery } from './utils';
import { UserForm } from './components';
import useEditUserQueryParams from './useEditUserQueryParams';
import useSearchQuery, { SearchQueryParam } from '@/hooks/useSearchQuery';

export type AdminUsersPageProps = {
  /** The users to display in the table */
  users: User[];
  /** The tables columns */
  columns: ColumnDef<User>[];
  /** Whether or not the confirm delete modal is open */
  open: boolean;
  /** Handler for setting the confirm delete modal to open */
  setOpen: (open: boolean) => void;
  /** Event handler for deleting the users account */
  handleDeleteAccount: (e: FormEvent<HTMLFormElement>) => void;
  /** Event handler for setting the query params for a search value */
  setSearchQuery: (search: string, queryParam: SearchQueryParam) => void;
};

const PREFIX = StylePrefix.ADMIN_USERS_PAGE;

export type User = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  username?: string | null;
  email: string;
  role: UserRole;
  accountCreatedAt: Date;
};

const getBadgeVariantForRole = (role: UserRole) => {
  switch (role) {
    case UserRole.ADMIN:
      return 'danger';
    case UserRole.USER:
      return 'primary';
  }
};

const getStringFromRole = (role: UserRole) => {
  switch (role) {
    case UserRole.ADMIN:
      return 'Admin';
    case UserRole.USER:
      return 'User';
  }
};

function AdminUsersPage(props: AdminUsersPageProps): ReactElement {
  const p = { ...props };

  return (
    <div className={`${PREFIX}`}>
      <DashboardPageHeader includePageNav page={PageType.ADMIN_USERS} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // @typescript-eslint/ban-ts-comment
          // eslint-disable-next-line
              // @ts-ignore
          const input = e.target.elements['usersSearch']; // get the input element by its name
          const value = input.value; // get the input value
          p.setSearchQuery(value, SearchQueryParam.USERS_SEARCH);
        }}
        className={`${PREFIX}-search-form`}
      >
        <SearchField
          name="usersSearch"
          aria-label="Search Users"
          placeholder="Search"
        />
        <Button variant="secondary" size="xsmall" type="submit">
          Submit
        </Button>
      </form>
      <div className={`${PREFIX}-content`}>
        <div className={`${PREFIX}-table-wrapper`}>
          <DataTable
            isLoading={false}
            data={p.users}
            columns={p.columns}
            isLeftMostColumnSticky
            isRightMostColumnSticky
            onRowPress={() => undefined}
          />
        </div>
        <div className={`${PREFIX}-form-wrapper`}>
          <UserForm />
        </div>
      </div>
      <ConfirmDeleteDialog
        name="user account"
        open={p.open}
        setOpen={p.setOpen}
        onSubmit={p.handleDeleteAccount}
      />
    </div>
  );
}

export default function AdminUsersPageContainer(): ReactElement {
  const { data, loading } = useGetUsersQuery();
  const users =
    data?.getAllUsers.map((user) => getUserFromUserQuery(user)) ?? [];
  const { updateUserId, removeUserId, userId } = useEditUserQueryParams();
  const [open, setOpen] = useState(false);
  const [deleteUser] = useDeleteUserMutation();
  const { addSearchQueryParam, getQueryParams } = useSearchQuery();
  const usersSearchQuery = getQueryParams(SearchQueryParam.USERS_SEARCH);

  const columns: ColumnDef<User>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: ({ getValue }) => {
        return (
          <div>
            <Text type="body-sm" className={'leading-5'}>
              {getValue<User['name']>()}
            </Text>
          </div>
        );
      },
    },
    {
      header: 'Username',
      accessorKey: 'username',
      cell: ({ getValue }) => {
        return (
          <div>
            <Text type="body-sm">{`${getValue<User['username']>()}`}</Text>
          </div>
        );
      },
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: ({ getValue }) => {
        return (
          <div>
            <Text type="body-sm">{`${getValue<User['email']>()}`}</Text>
          </div>
        );
      },
    },
    {
      header: 'Type',
      accessorKey: 'role',
      cell: ({ getValue }) => {
        const role = getValue<User['role']>();
        return (
          <div>
            <Badge
              className="text-gray-600"
              size="small"
              variant={getBadgeVariantForRole(role)}
            >
              {getStringFromRole(role)}
            </Badge>
          </div>
        );
      },
    },
    {
      header: 'Account Created',
      accessorKey: 'accountCreatedAt',
      cell: ({ getValue }) => {
        const date = getValue<User['accountCreatedAt']>();
        return (
          <div>
            <Text type="body-sm">{format(date, 'MM/dd/yyyy hh:mm')}</Text>
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <div className={`${PREFIX}-table-actions-wrapper`}>
            <InteractableComponent
              onPress={() => updateUserId(row.original.id)}
            >
              <EditSvg fill="#000000" />
            </InteractableComponent>
            <InteractableComponent
              onPress={() => {
                setOpen(true);
                updateUserId(row.original.id);
              }}
            >
              <TrashCanSvg />
            </InteractableComponent>
          </div>
        );
      },
    },
  ];

  const handleDeleteAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
      setOpen(false);
      return;
    }
    await deleteUser({
      variables: {
        id: userId,
      },
    });
    setOpen(false);
    removeUserId();
  };

  const setSearchQuery = (search: string, queryParam: SearchQueryParam) => {
    const params = encodeURIComponent(search);
    addSearchQueryParam([params], queryParam);
  };

  const filteredUserData = useMemo(() => {
    if (!usersSearchQuery) {
      return users;
    }
    const query = decodeURIComponent(usersSearchQuery[0]);
    return users.filter((user) => {
      return Object.values(user).some((value) => {
        return (
          value && value.toString().toLowerCase().includes(query.toLowerCase())
        );
      });
    });
  }, [users, usersSearchQuery]);

  return (
    <AdminUsersPage
      open={open}
      setOpen={setOpen}
      users={filteredUserData}
      columns={columns}
      handleDeleteAccount={handleDeleteAccount}
      setSearchQuery={setSearchQuery}
    />
  );
}
