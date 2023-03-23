import { UserRole } from '@/generated/graphql';
import { User } from './AdminUsersPage';

type UserQuery = {
  __typename?: 'UserV2';
  role: UserRole;
  createdAt: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username?: string | null;
};

export const getUserFromUserQuery = (user: UserQuery): User => ({
  id: user.id,
  name: `${user.firstName} ${user.lastName}`,
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  email: user.email,
  role: user.role,
  accountCreatedAt: new Date(user.createdAt),
});
