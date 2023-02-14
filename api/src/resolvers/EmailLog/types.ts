import { EmailObjectType } from '@/types';
import { Field, ID, InputType, ObjectType } from 'type-graphql';

@InputType({
  description: 'Input type for creating an email log.',
})
export class CreateEmailLogInput {
  @Field(() => String, {
    nullable: false,
    description: 'The email ID provided by gmail.',
  })
  emailId!: string;
}

@ObjectType({
  description: 'The most recent update for the email log.',
})
export class GetRecentEmailLogUpdate {
  @Field(() => Date, {
    nullable: false,
    description: 'The date of the most recent update.',
  })
  createdAt!: Date;
}

@ObjectType()
export class EmailObject {
  @Field(() => String, {
    nullable: false,
    description: 'The emails ID.',
  })
  id!: string;

  @Field(() => String, {
    nullable: false,
    description: 'Who the email was sent to.',
  })
  to!: string;

  @Field(() => String, {
    nullable: false,
    description: 'Who the email was sent from.',
  })
  from!: string;

  @Field(() => String, {
    nullable: false,
    description: 'The subject of the email.',
  })
  subject!: string;

  @Field(() => String, {
    nullable: false,
    description: 'The body of the email.',
  })
  body!: string;
}

@ObjectType({
  description: 'An email object.',
})
export class GetEmailByIdPayload extends EmailObject {}
