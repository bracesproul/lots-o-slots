import { Field, InputType } from 'type-graphql';
import { PaymentProvider } from '@/entities/Payment/Payment';

@InputType({
  description: 'Input type for creating a user payment.',
})
export class CreateUserPaymentInput {
  @Field(() => String, {
    nullable: false,
    description: 'The unique payment identifier.',
  })
  userIdentifier!: string;

  @Field(() => PaymentProvider, {
    nullable: false,
    description: 'The payment provider.',
  })
  paymentProvider!: PaymentProvider;

  @Field(() => Number, {
    nullable: false,
    description: 'The amount the user sent.',
  })
  amount!: number;

  @Field(() => String, {
    nullable: true,
    description: 'The ID of a relating user account.',
  })
  userId?: string;
}

@InputType({
  description: 'Input type for a user payment as processed.',
})
export class MarkUserPaymentAsProcessedInput {
  @Field(() => String, {
    nullable: false,
    description: 'The ID of the user payment.',
  })
  userPaymentId!: string;
}
