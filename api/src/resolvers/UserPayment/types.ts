import { Field, InputType } from 'type-graphql';
import { GameType, PaymentProvider } from '@/entities/Payment/Payment';

@InputType({
  description: 'Input type for creating a user payment.',
})
export class CreateUserPaymentInput {
  @Field(() => String, {
    nullable: false,
    description: 'The unique payment identifier.',
  })
  paymentIdentifier!: string;

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

  @Field(() => GameType, {
    nullable: false,
    description: 'The game type.',
  })
  gameType!: GameType;
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
