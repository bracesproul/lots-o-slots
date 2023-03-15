import { supabaseAdminClient, supabaseClient } from '../supabase';
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
      return AuthError('Error creating user in Supabase.');
    }
    if (!data.session || !data.user) {
      return AuthError('No user or session returned from Supabase.');
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
    const { supabaseId } = input;

    const {
      data: { user: requestedUser },
      error: getUserError,
    } = await supabaseAdminClient.auth.admin.getUserById(supabaseId);

    if (!requestedUser) {
      console.log('getUserError', getUserError);
      return UserNotFoundError();
    }
    if (requestedUser && getUserError) {
      return AuthError(getUserError.message);
    }

    const {
      data: { user: updatedUser },
      error: updateUserError,
    } = await supabaseAdminClient.auth.admin.updateUserById(supabaseId, {
      ...requestedUser,
      ...input,
    });

    if (updateUserError) {
      console.log('updateUserError', updateUserError);
      return UpdateUserError();
    }
    if (!updatedUser) {
      return UserNotFoundError();
    }

    return {
      user: updatedUser,
    };
  }

  async delete(id: string): Promise<void> {
    const { data, error } = await supabaseAdminClient.auth.admin.deleteUser(id);
    if (error) {
      return AuthError('Error deleting user in Supabase.');
    }
  }

  async resetPassword(email: string): Promise<void> {
    const PASSWORD_REDIRECT_URL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/user/resetPassword'
        : process.env.PASSWORD_REDIRECT_URL;
    if (!PASSWORD_REDIRECT_URL) {
      throw new Error('PASSWORD_REDIRECT_URL not set');
    }
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: PASSWORD_REDIRECT_URL,
    });
    if (error) {
      AuthError('Error sending password reset email');
    }
  }

  async refreshSession(refreshToken: string) {
    const { data, error } = await supabaseClient.auth.refreshSession({
      refresh_token: refreshToken,
    });
    if (error || !data.session || !data.user) {
      return AuthError('Error refreshing session');
    }
    return data;
  }
}
