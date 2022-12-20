import { EmailLogRepository } from '@/repositories';
import { EmailLog } from '@/entities';
import { Arg, Query, Resolver, Mutation } from 'type-graphql';
import {
  getManager,
  getCustomRepository,
  Transaction,
  TransactionManager,
  SelectQueryBuilder,
} from 'typeorm';
import { CreateEmailLogInput, GetRecentEmailLogUpdate } from './types';

// @Resolver(Repo)
@Resolver()
export class EmailLogResolver {
  
  @Mutation(() => EmailLog, { nullable: false })
  async createEmailLog(
    @Arg('input', { nullable: false }) input: CreateEmailLogInput,
    @TransactionManager() manager = getManager()
  ): Promise<EmailLog> {
    return getCustomRepository(EmailLogRepository).create(
      {
        emailId: input.emailId,
      },
      manager
    );
  }

  
  @Query(() => GetRecentEmailLogUpdate, { nullable: false })
  async getRecentUpdate(): Promise<GetRecentEmailLogUpdate> {
    const { createdAt } = await getCustomRepository(
      EmailLogRepository
    ).getRecentUpdate();
    return {
      createdAt,
    };
  }
}
