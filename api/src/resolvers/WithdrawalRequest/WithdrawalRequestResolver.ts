import { UserV2Repository, WithdrawalRequestRepository } from '@/repositories';
import { UserV2, WithdrawalRequest } from '@/entities';
import { Arg, Query, Mutation, Resolver, Ctx } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import {
  UpdateWithdrawalRequestStatusPayload,
  UpdateWithdrawalRequestStatusInput,
  CreateWithdrawalRequestPayload,
  CreateWithdrawalRequestInput,
  DeleteWithdrawalRequestPayload,
} from './types';
import { ContextType } from '@/types';

@Resolver()
export class WithdrawalRequestResolver {
  @Query(() => [WithdrawalRequest], { nullable: false })
  async getAllWithdrawalRequests(): Promise<WithdrawalRequest[]> {
    return getCustomRepository(WithdrawalRequestRepository).getAll();
  }

  @Mutation(() => CreateWithdrawalRequestPayload, { nullable: false })
  async createWithdrawalRequest(
    @Ctx() { user }: ContextType,
    @Arg('input', { nullable: false }) input: CreateWithdrawalRequestInput
  ): Promise<CreateWithdrawalRequestPayload> {
    let fetchedUser: UserV2;
    if (!user) {
      fetchedUser = await getCustomRepository(UserV2Repository).getById(
        input.userId
      );
    } else {
      fetchedUser = user;
    }
    const withdrawalRequest = await getCustomRepository(
      WithdrawalRequestRepository
    ).create({
      amount: input.amount,
      userId: fetchedUser.id,
      payoutMethod: input.payoutMethod,
      payoutAddress: input.payoutAddress,
      status: input.status,
    });

    return {
      success: true,
      withdrawalRequest,
    };
  }

  @Mutation(() => UpdateWithdrawalRequestStatusPayload, { nullable: false })
  async updateWithdrawalRequestStatus(
    @Arg('input', { nullable: false }) input: UpdateWithdrawalRequestStatusInput
  ): Promise<UpdateWithdrawalRequestStatusPayload> {
    const withdrawalRequest = await getCustomRepository(
      WithdrawalRequestRepository
    ).updateStatus(input);

    return {
      success: true,
      withdrawalRequest,
    };
  }

  @Mutation(() => DeleteWithdrawalRequestPayload, { nullable: false })
  async deleteWithdrawalRequest(
    @Arg('id', { nullable: false }) id: string
  ): Promise<DeleteWithdrawalRequestPayload> {
    await getCustomRepository(WithdrawalRequestRepository).delete(id);

    return {
      success: true,
    };
  }
}
