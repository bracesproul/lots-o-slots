import { Field, InputType } from 'type-graphql';

@InputType({
  description: 'Input type for creating a user.',
})
export class CreateUserInput {
  @Field(() => String, {
    nullable: false,
    description: 'The unique identifier for the user.',
  })
  userIdentifier?: string;

  @Field(() => Number, {
    nullable: false,
    description: 'The current users ballance.',
  })
  balance!: number;

  @Field(() => String, {
    nullable: false,
    description: 'The users email.',
  })
  email?: string;

  @Field(() => String, {
    nullable: false,
    description: 'The users password.',
  })
  password?: string;

  @Field(() => String, {
    nullable: false,
    description: 'The users cashtag.',
  })
  cashtag?: string;

  @Field(() => String, {
    nullable: false,
    description: 'The users zelle email.',
  })
  zelleEmail?: string;

  @Field(() => String, {
    nullable: false,
    description: 'The users paypal email.',
  })
  payPalEmail?: string;
}
