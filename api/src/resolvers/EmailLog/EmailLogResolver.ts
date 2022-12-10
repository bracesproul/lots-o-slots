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
import { CreateEmailLogInput } from './types';

// @Resolver(Repo)
@Resolver()
export class EmailLogResolver {
  @Transaction()
  @Mutation(() => EmailLog, { nullable: false })
  async createUser(
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
}
