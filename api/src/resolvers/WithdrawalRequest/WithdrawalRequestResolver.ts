import { UserV2Repository, WithdrawalRequestRepository } from '@/repositories';
import { WithdrawalRequest } from '@/entities';
import { Arg, Query, Mutation, Resolver, Ctx } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import {
  UpdateWithdrawalRequestStatusPayload,
  UpdateWithdrawalRequestStatusInput,
  CreateWithdrawalRequestPayload,
  CreateWithdrawalRequestInput,
  DeleteWithdrawalRequestPayload,
} from './types';

@Resolver()
export class WithdrawalRequestResolver {
  @Query(() => [WithdrawalRequest], { nullable: false })
  async getAllWithdrawalRequests(): Promise<WithdrawalRequest[]> {
    return getCustomRepository(WithdrawalRequestRepository).getAll();
  }

  @Mutation(() => CreateWithdrawalRequestPayload, { nullable: false })
  async createWithdrawalRequest(
    @Arg('input', { nullable: false }) input: CreateWithdrawalRequestInput
  ): Promise<CreateWithdrawalRequestPayload> {
    const user = await getCustomRepository(UserV2Repository).getById(
      input.userId
    );
    const withdrawalRequest = await getCustomRepository(
      WithdrawalRequestRepository
    ).create(input);

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
