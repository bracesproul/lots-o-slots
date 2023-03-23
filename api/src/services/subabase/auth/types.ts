import { UserV2 } from '@/entities';
import { UserRole } from '@/entities/UserV2/types';
import { UserData } from '@/repositories/UserV2Repository/types';
import type {
  Session as SupabaseUserSession,
  User as SupabaseUser,
} from '@supabase/supabase-js';

export type SignUpWithEmailPasswordInput = {
  email: string;
  password: string;
  data: UserData;
};

export type SignUpWithEmailPasswordResponse = {
  user: SupabaseUser;
  session: SupabaseUserSession;
};

export type SignInWithEmailPasswordInput = {
  email: string;
  password: string;
};

export type SignInWithEmailPasswordResponse = {
  user: SupabaseUser;
  session: SupabaseUserSession;
};

export type UpdateUserInput = {
  supabaseId: string;
  email?: string;
  password?: string;
  data?: UserData;
};

export type UpdateUserResponse = {
  user: SupabaseUser;
};
