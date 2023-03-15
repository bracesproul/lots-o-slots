import { UserV2Repository } from '@/repositories';
import { UserV2 } from '@/entities';
import { Arg, Query, Mutation, Resolver, Ctx } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import {
  SignUpPayload,
  SignUpInput,
  LoginInput,
  LoginPayload,
  UpdateInput,
  UpdatePayload,
  CheckSessionPayload,
  LogoutPayload,
} from './types';
import { ContextType } from '@/types';
import { GraphQLError } from 'graphql';

@Resolver()
export class UserV2Resolver {
  @Query(() => [UserV2], { nullable: false })
  async getAllUsers(): Promise<UserV2[]> {
    return getCustomRepository(UserV2Repository).getAll();
  }

  @Query(() => UserV2, { nullable: false })
  async getUserById(
    @Ctx() { user }: ContextType,
    @Arg('id', { nullable: false }) id: string
  ): Promise<UserV2> {
    return getCustomRepository(UserV2Repository).getById(id);
  }

  @Query(() => UserV2, { nullable: false })
  async getUserBySupabaseId(@Ctx() { user }: ContextType): Promise<UserV2> {
    if (!user) {
      throw new GraphQLError('User not found');
    }
    return getCustomRepository(UserV2Repository).getBySupabaseId(
      user.supabaseId
    );
  }

  @Query(() => CheckSessionPayload, { nullable: false })
  async checkSession(
    @Ctx() { supabaseRefreshToken, user, res }: ContextType
  ): Promise<CheckSessionPayload> {
    if (user?.refreshToken !== supabaseRefreshToken) {
      throw new GraphQLError('Not authenticated');
    }

    const { refreshToken } = await getCustomRepository(
      UserV2Repository
    ).refreshSession(
      {
        refreshToken: supabaseRefreshToken,
        user,
      },
      res
    );

    return {
      success: true,
      user,
      refreshToken,
    };
  }

  @Mutation(() => SignUpPayload, { nullable: false })
  async signUp(
    @Ctx() { res }: ContextType,
    @Arg('input', { nullable: false }) input: SignUpInput
  ): Promise<SignUpPayload> {
    const { user: signedUpUser, supabaseUserResponse } =
      await getCustomRepository(UserV2Repository).signUp(input, res);

    return {
      success: true,
      session: supabaseUserResponse.session,
      user: signedUpUser,
    };
  }

  @Mutation(() => LoginPayload, { nullable: false })
  async login(
    @Ctx() { res }: ContextType,
    @Arg('input', { nullable: false }) input: LoginInput
  ): Promise<LoginPayload> {
    const { user: loggedInUser, supabaseUserResponse } =
      await getCustomRepository(UserV2Repository).login(input, res);

    return {
      session: supabaseUserResponse.session,
      success: true,
      user: loggedInUser,
    };
  }

  @Mutation(() => UpdatePayload, { nullable: false })
  async updateUser(
    @Ctx() { user }: ContextType,
    @Arg('input', { nullable: false }) input: UpdateInput
  ): Promise<UpdatePayload> {
    if (!user) {
      throw new GraphQLError('User not found');
    }
    const { user: updatedUser } = await getCustomRepository(
      UserV2Repository
    ).update(input, user);

    return {
      user: updatedUser,
      success: true,
    };
  }

  @Mutation(() => LogoutPayload, { nullable: false })
  async logout(@Ctx() { user, res }: ContextType): Promise<LogoutPayload> {
    if (!user) {
      throw new GraphQLError('User not found');
    }
    await getCustomRepository(UserV2Repository).logout(user, res);

    return {
      success: true,
    };
  }
}
