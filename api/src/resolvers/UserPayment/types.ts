import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { GameType, PaymentProvider } from '@/entities/Payment/Payment';
import { UserPayment } from '@/entities';

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

@InputType({
  description: 'Input type for a user payment as processed.',
})
export class GetUserPaymentsInput {
  @Field(() => Boolean, {
    nullable: false,
    description: 'The ID of the user payment.',
  })
  processed?: boolean;
}

@ObjectType({
  description: 'The result of marking a user payment as processed.',
})
export class MarkUserPaymentAsProcessedResult {
  @Field(() => Boolean, {
    nullable: false,
    description: 'Whether or not the payment is marked as processed.',
  })
  success!: boolean;

  @Field(() => UserPayment, {
    nullable: false,
    description: 'The user payment marked as processed.',
  })
  userPayment!: UserPayment;
}

@InputType({
  description: 'Input type for updating a user payment status.',
})
export class UpdateUserPaymentStatusInput {
  @Field(() => ID)
  id!: string;

  @Field(() => Boolean)
  processed!: boolean;
}

@ObjectType({
  description: 'Payload type for updating a user payment status.',
})
export class UpdateUserPaymentStatusPayload {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => UserPayment)
  userPayment!: UserPayment;
}

@ObjectType({
  description: 'Payload type for deleting a user payment.',
})
export class DeleteUserPaymentPayload {
  @Field(() => Boolean)
  success!: boolean;
}
