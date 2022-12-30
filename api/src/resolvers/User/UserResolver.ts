import { UserRepository } from '@/repositories';
import { User } from '@/entities';
import { Arg, Query, Mutation, Resolver } from 'type-graphql';
import { getManager, getCustomRepository } from 'typeorm';
import { CreateUserInput } from './types';

@Resolver()
export class UserResolver {
  @Query(() => [User], { nullable: false })
  async getAllUsers(): Promise<User[]> {
    return getCustomRepository(UserRepository).getAll();
  }

  @Mutation(() => User, { nullable: false })
  async createUser(
    @Arg('input', { nullable: false }) input: CreateUserInput
  ): Promise<User> {
    return getCustomRepository(UserRepository).createUser({
      userIdentifier: input.userIdentifier,
      balance: input.balance,
      email: input.email,
      password: input.password,
    });
  }
}
