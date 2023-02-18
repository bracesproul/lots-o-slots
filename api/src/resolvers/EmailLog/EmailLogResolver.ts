import { EmailLogRepository } from '@/repositories';
import { EmailLog } from '@/entities';
import { Arg, Query, Resolver, Mutation } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import {
  CreateEmailLogInput,
  GetEmailByIdPayload,
  GetRecentEmailLogUpdate,
  GetSupabaseSignedUrlInput,
  GetSupabaseSignedUrlPayload,
} from './types';
import { MessageListener } from '@/services';
import {
  getSignedUrlForFile,
  SupabaseBucket,
  SupabaseRawEmailFolderPath,
  uploadEmailToStorageBucket,
} from '@/services/subabase';

// @Resolver(Repo)
@Resolver()
export class EmailLogResolver {
  @Mutation(() => EmailLog, { nullable: false })
  async createEmailLog(
    @Arg('input', { nullable: false }) input: CreateEmailLogInput
  ): Promise<EmailLog> {
    return getCustomRepository(EmailLogRepository).create({
      emailId: input.emailId,
    });
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

  @Query(() => GetEmailByIdPayload, { nullable: false })
  async getEmailById(
    @Arg('id', { nullable: false }) id: string
  ): Promise<GetEmailByIdPayload> {
    const messageListener = new MessageListener();

    const email = await messageListener.getMessages({
      messageIds: [id],
    });

    return email[0];
  }

  @Query(() => GetSupabaseSignedUrlPayload, { nullable: false })
  async getSupabaseSignedUrl(
    @Arg('input', { nullable: false }) input: GetSupabaseSignedUrlInput
  ): Promise<GetSupabaseSignedUrlPayload> {
    const signedUrlPayload = await getSignedUrlForFile(input);

    return {
      ...input,
      signedUrl: signedUrlPayload.url,
      errorMessage: signedUrlPayload.errorMessage,
      reason: signedUrlPayload.reason,
    };
  }
}
