import { supabaseClient } from '../supabase';
import {
  SignInWithEmailPasswordInput,
  SignInWithEmailPasswordResponse,
  SignUpWithEmailPasswordInput,
  SignUpWithEmailPasswordResponse,
  UpdateUserInput,
  UpdateUserResponse,
} from './types';
import { UserNotFoundError, AuthError, UpdateUserError } from './errors';

export default class SupabaseAuth {
  async signUp(
    input: SignUpWithEmailPasswordInput
  ): Promise<SignUpWithEmailPasswordResponse> {
    const { email, password, data: userData } = input;
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: { data: { ...userData } },
    });

    if (error) {
      throw new Error(error.message);
    }
    if (!data.session || !data.user) {
      throw new Error('No session and/or user');
    }

    return {
      user: data.user,
      session: data.session,
    };
  }

  async login(
    input: SignInWithEmailPasswordInput
  ): Promise<SignInWithEmailPasswordResponse> {
    const { email, password } = input;
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return AuthError(error.message);
    }
    if (!data.session || !data.user) {
      return UserNotFoundError();
    }
    return {
      user: data.user,
      session: data.session,
    };
  }

  async update(input: UpdateUserInput): Promise<UpdateUserResponse> {
    const { jwt } = input;
    const {
      data: { user: requestedUser },
      error: getUserError,
    } = await supabaseClient.auth.getUser(jwt);

    if (!requestedUser) {
      return UserNotFoundError();
    }
    if (requestedUser && getUserError) {
      return AuthError(getUserError.message);
    }

    const {
      data: { user: updatedUser },
      error: updateUserError,
    } = await supabaseClient.auth.updateUser({ ...requestedUser, ...input });

    if (!updateUserError) {
      return UpdateUserError();
    }
    if (updatedUser && updateUserError) {
      return AuthError(updateUserError.message);
    }
    if (!updatedUser) {
      return UserNotFoundError();
    }

    return {
      user: updatedUser,
    };
  }
}
