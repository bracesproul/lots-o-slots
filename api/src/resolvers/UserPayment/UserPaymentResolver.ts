import { UserPaymentRepository } from '@/repositories';
import { UserPayment } from '@/entities';
import { Arg, Query, Mutation, Resolver } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import {
  CreateUserPaymentInput,
  MarkUserPaymentAsProcessedInput,
  GetUserPaymentsInput,
  MarkUserPaymentAsProcessedResult,
} from './types';
import { ApolloError } from 'apollo-server-express';
import { DiscordLog } from '@/services';

@Resolver()
export class UserPaymentResolver {
  @Query(() => [UserPayment], { nullable: false })
  async getUserPayments(
    @Arg('input', { nullable: true }) input: GetUserPaymentsInput
  ): Promise<UserPayment[]> {
    return getCustomRepository(UserPaymentRepository).getAll({
      processed: input?.processed,
    });
  }

  @Mutation(() => UserPayment, { nullable: false })
  async createUserPayment(
    @Arg('input', { nullable: false }) input: CreateUserPaymentInput
  ): Promise<UserPayment> {
    const discordLogger = new DiscordLog();
    await discordLogger.logUserPayment(input);

    return getCustomRepository(UserPaymentRepository).create({
      paymentIdentifier: input.paymentIdentifier,
      paymentProvider: input.paymentProvider,
      amount: input.amount,
      userId: input.userId,
      gameType: input.gameType,
    });
  }

  @Mutation(() => MarkUserPaymentAsProcessedResult, { nullable: false })
  async markUserPaymentAsProcessed(
    @Arg('input', { nullable: false }) input: MarkUserPaymentAsProcessedInput
  ): Promise<MarkUserPaymentAsProcessedResult> {
    const userPayment = await getCustomRepository(
      UserPaymentRepository
    ).markAsProcessed(input.userPaymentId);
    if (!userPayment) {
      throw new ApolloError('User payment not found.');
    }
    return {
      success: true,
      userPayment,
    };
  }
}
