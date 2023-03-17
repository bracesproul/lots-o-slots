import { UserPaymentRepository } from '@/repositories';
import { UserPayment, UserV2 } from '@/entities';
import {
  Arg,
  Query,
  Mutation,
  Resolver,
  FieldResolver,
  Root,
} from 'type-graphql';
import { getCustomRepository, getRepository } from 'typeorm';
import {
  CreateUserPaymentInput,
  MarkUserPaymentAsProcessedInput,
  GetUserPaymentsInput,
  MarkUserPaymentAsProcessedResult,
  UpdateUserPaymentStatusInput,
  UpdateUserPaymentStatusPayload,
} from './types';
import { ApolloError } from 'apollo-server-express';
import { DiscordLog } from '@/services';

@Resolver(() => UserPayment)
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

  @Mutation(() => UpdateUserPaymentStatusPayload, { nullable: false })
  async updateUserPaymentStatus(
    @Arg('input', { nullable: false }) input: UpdateUserPaymentStatusInput
  ): Promise<UpdateUserPaymentStatusPayload> {
    const userPayment = await getCustomRepository(
      UserPaymentRepository
    ).updateStatus(input);
    if (!userPayment) {
      throw new ApolloError('User payment not found.');
    }
    return {
      success: true,
      userPayment,
    };
  }

  @FieldResolver(() => UserV2 || undefined, {
    nullable: true,
  })
  async user(@Root() userPayment: UserPayment): Promise<UserV2 | undefined> {
    const user = await getRepository(UserV2)
      .createQueryBuilder('user')
      .innerJoinAndSelect(
        UserPayment,
        'userPayment',
        'userPayment.userV2Id = user.id'
      )
      .where('userPayment.id = :userPaymentId', {
        userPaymentId: userPayment.id,
      })
      .getOne();
    return user;
  }
}
