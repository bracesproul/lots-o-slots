import { UserV2 } from '@/entities';
import { UserRole } from '@/entities/UserV2/types';
import {
  SignInWithEmailPasswordResponse,
  SignUpWithEmailPasswordResponse,
} from '@/services/subabase/auth/types';

export type UserData = {
  role: UserRole;
  firstName: string;
  lastName: string;
  username?: string;
};

export type CreateUserInput = {
  email: string;
  password: string;
  data: UserData;
};

export type CreateUserResponse = {
  supabaseUserResponse: SignUpWithEmailPasswordResponse;
  user: UserV2;
};

export type LoginUserInput = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  supabaseUserResponse: SignInWithEmailPasswordResponse;
  user: UserV2;
};

export type UpdateUserInput = {
  /** The users ID, pulled from the user_v2 table. */
  id: string;
  jwt: string;
  email?: string;
  password?: string;
  data?: UserData;
};

export type UpdateUserResponse = {
  user: UserV2;
};
