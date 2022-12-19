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
  @Transaction()
  @Mutation(() => Account, { nullable: false })
  async addAccount(
    @Arg('input', { nullable: false }) input: AddAccountInput
  ): Promise<Account> {
    return getCustomRepository(AccountRepository).createAccount(input);
  }

  @Transaction()
  @Query(() => GetAllAccountsQuery, { nullable: false })
  async getAllAccounts(
    @Arg('input', { nullable: true }) input?: GetAllAccountsInput
  ): Promise<GetAllAccountsQuery> {
    const accounts = await getCustomRepository(AccountRepository).getAll({
      type: input?.type,
    });
    return {
      accounts,
    };
  }
}
