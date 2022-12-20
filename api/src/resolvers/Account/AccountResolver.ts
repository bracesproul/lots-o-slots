import { AccountRepository } from '@/repositories';
import { Account } from '@/entities';
import { Arg, Query, Resolver, Mutation } from 'type-graphql';
import {
  getManager,
  getCustomRepository,
  Transaction,
  TransactionManager,
  SelectQueryBuilder,
} from 'typeorm';
import {
  GetAllAccountsQuery,
  AddAccountInput,
  GetAllAccountsInput,
} from './types';

@Resolver()
export class AccountResolver {
  @Mutation(() => Account, { nullable: false })
  async addAccount(
    @Arg('input', { nullable: false }) input: AddAccountInput
  ): Promise<Account> {
    return getCustomRepository(AccountRepository).createAccount(input);
  }

  @Query(() => [Account], { nullable: false })
  async getAllAccounts(
    @Arg('input', { nullable: true }) input?: GetAllAccountsInput
  ): Promise<Account[]> {
    return getCustomRepository(AccountRepository).getAll({
      provider: input?.provider,
    });
  }
}
