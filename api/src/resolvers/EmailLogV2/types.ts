import {
  SupabaseBucket,
  SupabaseRawEmailFolderPath,
} from '@/services/subabase';
import { Field, InputType, ObjectType } from 'type-graphql';

@InputType({
  description: 'Input type for getting all email logs.',
})
export class GetAllEmailLogsInput {
  @Field(() => Boolean, {
    nullable: true,
  })
  hasTransactions?: boolean;
}

@ObjectType({
  description: 'Payload type for deleting an email log.',
})
export class DeleteEmailLogPayload {
  @Field(() => Boolean)
  success!: boolean;
}
