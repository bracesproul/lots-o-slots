import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Transaction } from '@/entities';
import { PaymentProvider } from '@/entities/Payment/Payment';
import { PaymentStatus, PaymentType } from '@/entities/Transaction/types';

@InputType({
  description: 'Input type for creating a transaction.',
})
export class CreateTransactionInput {
  @Field(() => String, {
    nullable: true,
    description: 'The unique identifier for the user.',
  })
  userId?: string;

  @Field(() => Number, {
    nullable: false,
    description: 'The transaction amount.',
  })
  amount!: number;

  @Field(() => PaymentStatus, {
    nullable: false,
    description: 'The payments status.',
  })
  status!: PaymentStatus;

  @Field(() => String, {
    nullable: true,
    description: 'The unique email identifier from the transaction email.',
  })
  emailLogId?: string;

  @Field(() => PaymentProvider, {
    nullable: false,
    description: 'The transaction provider.',
  })
  provider!: PaymentProvider;

  @Field(() => String, {
    nullable: false,
    description: 'The name of the user that sent the transaction.',
  })
  senderName!: string;

  @Field(() => PaymentType, {
    nullable: false,
    description: 'The type of transaction.',
  })
  paymentType!: PaymentType;
}

@ObjectType({
  description: 'The created transaction object.',
})
export class CreatedTransactionResponse {
  @Field(() => Boolean, {
    nullable: false,
    description: 'Whether or not the transaction was created',
  })
  success!: boolean;

  @Field(() => Transaction, {
    nullable: false,
    description: 'The created transaction object.',
  })
  transaction!: Transaction;
}

@InputType({
  description: 'Input type for marking a transaction as processed.',
})
export class MarkPaymentAsProcessedInput {
  @Field(() => String, {
    nullable: false,
    description: 'The transaction ID.',
  })
  id!: string;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Whether or not to mark the transaction as processed.',
  })
  processed!: boolean;
}

@InputType({
  description: 'Input type for getting payments.',
})
export class GetTransactionsInput {
  @Field(() => PaymentStatus, {
    nullable: true,
    description: 'A transactions status.',
  })
  status?: PaymentStatus;

  @Field(() => PaymentProvider, {
    nullable: true,
    description: 'The provider of the transaction.',
  })
  paymentProvider?: PaymentProvider;

  @Field(() => PaymentType, {
    nullable: true,
    description: 'The type of the transaction.',
  })
  paymentType?: PaymentType;
}

@InputType({
  description: 'Input type for updating a user transaction status.',
})
export class UpdateTransactionStatusInput {
  @Field(() => ID)
  id!: string;

  @Field(() => PaymentStatus, {
    nullable: false,
  })
  status!: PaymentStatus;
}

@ObjectType({
  description: 'Payload type for updating a user transaction status.',
})
export class UpdateTransactionStatusPayload {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => Transaction)
  transaction!: Transaction;
}

@ObjectType({
  description: 'Payload type for deleting a user transaction.',
})
export class DeleteTransactionPayload {
  @Field(() => Boolean)
  success!: boolean;
}
