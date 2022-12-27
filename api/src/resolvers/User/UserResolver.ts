import { UserRepository } from '@/repositories';
import { User } from '@/entities';
import { Arg, Query, Resolver } from 'type-graphql';
import { getManager, getCustomRepository } from 'typeorm';
import { CreateUserInput } from './types';

// @Resolver(Repo)
@Resolver()
export class UserResolver {
  @Query(() => [User], { nullable: false })
  async getAllUsers(): Promise<User[]> {
    return getCustomRepository(UserRepository).getAll();
  }

  @Query(() => User, { nullable: false })
  async createUser(
    @Arg('input', { nullable: false }) input: CreateUserInput
  ): Promise<User> {
    return getCustomRepository(UserRepository).createUser({
      userIdentifier: input.userIdentifier,
      balance: input.balance,
    });
  }
}
