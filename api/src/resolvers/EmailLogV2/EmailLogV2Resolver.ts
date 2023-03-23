import { EmailLogV2Repository } from '@/repositories';
import { EmailLogV2 } from '@/entities';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getCustomRepository, getRepository } from 'typeorm';
import { DeleteEmailLogPayload, GetAllEmailLogsInput } from './types';

@Resolver(EmailLogV2)
export class EmailLogV2Resolver {
  @Query(() => [EmailLogV2], { nullable: false })
  async getAllEmailLogs(
    @Arg('input', { nullable: true }) input: GetAllEmailLogsInput
  ): Promise<EmailLogV2[]> {
    const emails = await getCustomRepository(EmailLogV2Repository).getAll({
      hasTransactions: input?.hasTransactions,
    });

    return emails;
  }

  @Query(() => EmailLogV2, { nullable: false })
  async getEmailById(
    @Arg('id', { nullable: false }) id: string
  ): Promise<EmailLogV2> {
    const email = await getCustomRepository(EmailLogV2Repository).findOneOrFail(
      id
    );

    return email;
  }

  @Mutation(() => DeleteEmailLogPayload, { nullable: false })
  async deleteEmailLog(
    @Arg('id', { nullable: false }) id: string
  ): Promise<DeleteEmailLogPayload> {
    await getRepository(EmailLogV2).delete(id);

    return {
      success: true,
    };
  }
}
