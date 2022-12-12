import { PaymentRepository } from '@/repositories';
import { Payment } from '@/entities';
import { Arg, Query, Resolver, Mutation } from 'type-graphql';
import { getCustomRepository, Transaction } from 'typeorm';
import {
  CreatePaymentInput,
  CreatedPaymentResponse,
  MarkPaymentAsProcessedResponse,
  MarkPaymentAsProcessedInput,
  GetPaymentsInput,
} from './types';
import { ApolloError } from 'apollo-server-express';
import { parsePayPalPayment } from '@/utils';

// @Resolver(Repo)
@Resolver()
export class PaymentResolver {
  @Transaction()
  @Query(() => [Payment], { nullable: false })
  async getAllPayments(
    @Arg('input', { nullable: true }) input?: GetPaymentsInput
  ): Promise<Payment[]> {
    if (!input?.processed) {
      throw new ApolloError('no input passed');
    }

    return getCustomRepository(PaymentRepository).getAll({
      processed: input?.processed,
      paymentProvider: input?.paymentProvider,
    });
  }

  @Transaction()
  @Mutation(() => CreatedPaymentResponse, { nullable: false })
  async createPayment(
    @Arg('input', { nullable: false }) input: CreatePaymentInput
  ): Promise<CreatedPaymentResponse> {
    const payment = await getCustomRepository(PaymentRepository).createPayment({
      userIdentifier: input.userIdentifier,
      amount: input.amount,
      processed: input.processed,
      emailId: input.emailId,
      provider: input.provider,
      senderName: input.senderName,
      transactionId: input.transactionId,
    });
    return {
      success: true,
      payment,
    };
  }

  @Transaction()
  @Mutation(() => MarkPaymentAsProcessedResponse, { nullable: false })
  async markPaymentAsProcessed(
    @Arg('input', { nullable: false }) input: MarkPaymentAsProcessedInput
  ): Promise<MarkPaymentAsProcessedResponse> {
    const payment = await getCustomRepository(
      PaymentRepository
    ).markPaymentAsProcessed({
      id: input.id,
    });
    return {
      success: true,
      payment,
    };
  }
}
