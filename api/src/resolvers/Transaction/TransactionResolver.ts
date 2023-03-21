import { TransactionRepository } from '@/repositories';
import { Transaction } from '@/entities';
import { Arg, Query, Resolver, Mutation } from 'type-graphql';
import { getCustomRepository, getRepository } from 'typeorm';
import {
  CreateTransactionInput,
  CreatedTransactionResponse,
  GetTransactionsInput,
  UpdateTransactionStatusPayload,
  UpdateTransactionStatusInput,
  DeleteTransactionPayload,
} from './types';

@Resolver(Transaction)
export class TransactionResolver {
  @Query(() => [Transaction], { nullable: false })
  async getAllTransactions(
    @Arg('input', { nullable: true }) input?: GetTransactionsInput
  ): Promise<Transaction[]> {
    return getCustomRepository(TransactionRepository).getAll({
      status: input?.status,
      provider: input?.paymentProvider,
      paymentType: input?.paymentType,
    });
  }

  @Mutation(() => CreatedTransactionResponse, { nullable: false })
  async createTransaction(
    @Arg('input', { nullable: false }) input: CreateTransactionInput
  ): Promise<CreatedTransactionResponse> {
    const transaction = await getCustomRepository(
      TransactionRepository
    ).createAdminTransaction({
      amount: input.amount,
      status: input.status,
      emailLogId: input.emailLogId,
      provider: input.provider,
      senderName: input.senderName,
      paymentType: input.paymentType,
    });
    return {
      success: true,
      transaction,
    };
  }

  @Mutation(() => UpdateTransactionStatusPayload, { nullable: false })
  async updateTransactionStatus(
    @Arg('input', { nullable: false }) input: UpdateTransactionStatusInput
  ): Promise<UpdateTransactionStatusPayload> {
    const transaction = await getCustomRepository(
      TransactionRepository
    ).updateStatus(input);

    return {
      success: true,
      transaction,
    };
  }

  @Mutation(() => DeleteTransactionPayload, { nullable: false })
  async deletePayment(
    @Arg('id', { nullable: false }) id: string
  ): Promise<DeleteTransactionPayload> {
    await getRepository(Transaction).delete(id);

    return {
      success: true,
    };
  }
}
