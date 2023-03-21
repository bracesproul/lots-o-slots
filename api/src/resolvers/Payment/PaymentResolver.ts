import { PaymentRepository } from '@/repositories';
import { Payment } from '@/entities';
import { Arg, Query, Resolver, Mutation } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import {
  CreatePaymentInput,
  CreatedPaymentResponse,
  MarkPaymentAsProcessedResponse,
  MarkPaymentAsProcessedInput,
  GetPaymentsInput,
  UpdatePaymentStatusPayload,
  UpdatePaymentStatusInput,
  DeletePaymentPayload,
} from './types';

@Resolver(Payment)
@Resolver()
export class PaymentResolver {
  @Query(() => [Payment], { nullable: false })
  async getAllPayments(
    @Arg('input', { nullable: true }) input?: GetPaymentsInput
  ): Promise<Payment[]> {
    return getCustomRepository(PaymentRepository).getAll({
      processed: input?.processed,
      paymentProvider: input?.paymentProvider,
      paymentType: input?.paymentType,
    });
  }

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
      paymentType: input.paymentType,
    });
    return {
      success: true,
      payment,
    };
  }

  @Mutation(() => MarkPaymentAsProcessedResponse, { nullable: false })
  async markPaymentAsProcessed(
    @Arg('input', { nullable: false }) input: MarkPaymentAsProcessedInput
  ): Promise<MarkPaymentAsProcessedResponse> {
    const payment = await getCustomRepository(
      PaymentRepository
    ).markPaymentAsProcessed({
      id: input.id,
      processed: input.processed,
    });
    return {
      success: true,
      payment,
    };
  }

  @Mutation(() => UpdatePaymentStatusPayload, { nullable: false })
  async updatePaymentStatus(
    @Arg('input', { nullable: false }) input: UpdatePaymentStatusInput
  ): Promise<UpdatePaymentStatusPayload> {
    const payment = await getCustomRepository(PaymentRepository).updateStatus(
      input
    );

    return {
      success: true,
      payment,
    };
  }

  @Mutation(() => DeletePaymentPayload, { nullable: false })
  async deletePayment(
    @Arg('id', { nullable: false }) id: string
  ): Promise<DeletePaymentPayload> {
    const payment = await getCustomRepository(PaymentRepository).delete(id);

    return {
      success: true,
    };
  }
}
