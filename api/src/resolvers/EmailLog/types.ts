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
