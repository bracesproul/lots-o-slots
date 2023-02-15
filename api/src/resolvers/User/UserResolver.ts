import { UserRepository } from '@/repositories';
import { User } from '@/entities';
import { Arg, Query, Mutation, Resolver } from 'type-graphql';
import { getManager, getCustomRepository } from 'typeorm';
import { CreateUserInput } from './types';
import { DiscordLog } from '@/services';

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
    const discordLogger = new DiscordLog();
    await discordLogger.logNewUser(input);

    return getCustomRepository(UserRepository).createUser({
      userIdentifier: input.userIdentifier,
      balance: input.balance,
      email: input.email,
      password: input.password,
      cashtag: input.cashtag,
      zelleEmail: input.zelleEmail,
      payPalEmail: input.payPalEmail,
    });
  }
}
