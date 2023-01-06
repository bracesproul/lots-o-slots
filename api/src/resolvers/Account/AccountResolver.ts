import { AccountRepository } from '@/repositories';
import { Account } from '@/entities';
import { Arg, Query, Resolver, Mutation } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import {
  AddAccountInput,
  GetAllAccountsInput,
  SwitchDefaultAccountInput,
} from './types';

@Resolver()
export class AccountResolver {
  @Mutation(() => Account, { nullable: false })
  async addAccount(
    @Arg('input', { nullable: false }) input: AddAccountInput
  ): Promise<Account> {
    return getCustomRepository(AccountRepository).createAccount(input);
  }

  @Mutation(() => Account, { nullable: false })
  async switchDefaultAccount(
    @Arg('input', { nullable: false }) input: SwitchDefaultAccountInput
  ): Promise<Account> {
    return getCustomRepository(AccountRepository).switchDefaultAccount(input);
  }

  @Query(() => [Account], { nullable: false })
  async getAllAccounts(
    @Arg('input', { nullable: true }) input?: GetAllAccountsInput
  ): Promise<Account[]> {
    return getCustomRepository(AccountRepository).getAll({
      provider: input?.provider,
      defaultAccounts: input?.defaultAccounts,
    });
  }
}
