import { UserPaymentRepository } from '@/repositories';
import { UserPayment } from '@/entities';
import { Arg, Query, Mutation, Resolver } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import {
  CreateUserPaymentInput,
  MarkUserPaymentAsProcessedInput,
} from './types';
import { ApolloError } from 'apollo-server-express';

@Resolver()
export class UserPaymentResolver {
  @Query(() => [UserPayment], { nullable: false })
  async getAll(): Promise<UserPayment[]> {
    return getCustomRepository(UserPaymentRepository).getAll();
  }

  @Mutation(() => UserPayment, { nullable: false })
  async createUserPayment(
    @Arg('input', { nullable: false }) input: CreateUserPaymentInput
  ): Promise<UserPayment> {
    return getCustomRepository(UserPaymentRepository).create({
      paymentIdentifier: input.userIdentifier,
      paymentProvider: input.paymentProvider,
      amount: input.amount,
      userId: input.userId,
    });
  }

  @Mutation(() => UserPayment, { nullable: false })
  async markAsProcessed(
    @Arg('input', { nullable: false }) input: MarkUserPaymentAsProcessedInput
  ): Promise<UserPayment> {
    const userPayment = await getCustomRepository(
      UserPaymentRepository
    ).markAsProcessed(input.userPaymentId);
    if (!userPayment) {
      throw new ApolloError('User payment not found.');
    }
    return userPayment;
  }
}
