import { UserV2Repository } from '@/repositories';
import { UserV2 } from '@/entities';
import { Arg, Query, Mutation, Resolver } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import { SignUpPayload, SignUpInput, LoginInput, LoginPayload, UpdateInput, UpdatePayload } from './types';

@Resolver()
export class UserV2Resolver {
  @Query(() => [UserV2], { nullable: false })
  async getAllUsers(): Promise<UserV2[]> {
    return getCustomRepository(UserV2Repository).getAll();
  }

  @Query(() => UserV2, { nullable: false })
  async getUserById(
    @Arg('id', { nullable: false }) id: string,
  ): Promise<UserV2> {
    return getCustomRepository(UserV2Repository).getById(id);
  }

  @Mutation(() => SignUpPayload, { nullable: false })
  async signUp(
    @Arg('input', { nullable: false }) input: SignUpInput
  ): Promise<SignUpPayload> {
    const { user, supabaseUserResponse } = await getCustomRepository(UserV2Repository).signUp(input);

    return {
      success: true,
      session: supabaseUserResponse.session,
      user,
    }
  }

  @Mutation(() => LoginPayload, { nullable: false })
  async login(
    @Arg('input', { nullable: false }) input: LoginInput
  ): Promise<LoginPayload> {
    const { user, supabaseUserResponse } = await getCustomRepository(UserV2Repository).login(input);

    return {
      session: supabaseUserResponse.session,
      success: true,
      user,
    }
  }

  @Mutation(() => UpdatePayload, { nullable: false })
  async updateUser(
    @Arg('input', { nullable: false }) input: UpdateInput
  ): Promise<UpdatePayload> {
    const { user } = await getCustomRepository(UserV2Repository).update(input);

    return {
      user,
      success: true
    }
  }
}
