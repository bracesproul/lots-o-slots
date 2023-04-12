import { UserPaymentRepository, UserV2Repository } from '@/repositories';
import { UserPayment, UserV2 } from '@/entities';
import {
  Arg,
  Query,
  Mutation,
  Resolver,
  FieldResolver,
  Root,
  Ctx,
} from 'type-graphql';
import { getCustomRepository, getRepository } from 'typeorm';
import {
  CreateUserPaymentInput,
  MarkUserPaymentAsProcessedInput,
  GetUserPaymentsInput,
  MarkUserPaymentAsProcessedResult,
  UpdateUserPaymentStatusInput,
  UpdateUserPaymentStatusPayload,
  DeleteUserPaymentPayload,
} from './types';
import { ApolloError } from 'apollo-server-express';
import { DiscordLog } from '@/services';
import { ContextType } from '@/types';

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
    @Ctx() { user }: ContextType,
    @Arg('input', { nullable: false }) input: CreateUserPaymentInput
  ): Promise<UserPayment> {
    const discordLogger = new DiscordLog();
    await discordLogger.logUserPayment(input);

    let fetchedUser: UserV2;
    if (!user) {
      fetchedUser = await getCustomRepository(UserV2Repository).getById(
        input.userId ?? ''
      );
    } else {
      fetchedUser = user;
    }

    return getCustomRepository(UserPaymentRepository).create({
      paymentIdentifier: input.paymentIdentifier,
      paymentProvider: input.paymentProvider,
      amount: input.amount,
      userId: fetchedUser.id,
      gameType: input.gameType,
      username: input.username,
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

  @Mutation(() => DeleteUserPaymentPayload, { nullable: false })
  async deleteUserPayment(
    @Arg('id', { nullable: false }) id: string
  ): Promise<DeleteUserPaymentPayload> {
    const payment = await getCustomRepository(UserPaymentRepository).delete(id);

    return {
      success: true,
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
