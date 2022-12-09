import { UserRepository } from '@/repositories';
import { User } from '@/entities';
import { Arg, Query, Resolver } from 'type-graphql';
import {
  getManager,
  getCustomRepository,
  Transaction,
  TransactionManager,
  SelectQueryBuilder,
} from 'typeorm';
import { CreateUserInput } from './types';

// @Resolver(Repo)
@Resolver()
export class UserResolver {
  @Transaction()
  @Query(() => [User], { nullable: false })
  async getAllUsers(): Promise<User[]> {
    return getCustomRepository(UserRepository).getAll();
  }

  @Transaction()
  @Query(() => User, { nullable: false })
  async createUser(
    @Arg('input', { nullable: false }) input: CreateUserInput,
    @TransactionManager() manager = getManager()
  ): Promise<User> {
    return getCustomRepository(UserRepository).createUser(
      {
        userIdentifier: input.userIdentifier,
        balance: input.balance,
      },
      manager
    );
  }
}
