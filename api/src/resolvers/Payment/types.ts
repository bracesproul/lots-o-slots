import { Field, InputType, ObjectType } from 'type-graphql';
import createConnectionType from '../shared/createConnectionType';
import { Payment } from '@/entities';
import { PaymentProvider } from '@/entities/Payment/Payment';

@ObjectType()
export class PaymentConnection extends createConnectionType(
  'Payment',
  Payment
) {}

@InputType({
  description: 'Input type for creating a payment.',
})
export class CreatePaymentInput {
  @Field(() => String, {
    nullable: false,
    description: 'The unique identifier for the user.',
  })
  userIdentifier!: string;

  @Field(() => Number, {
    nullable: false,
    description: 'The payment amount.',
  })
  amount!: number;

  @Field(() => Boolean, {
    nullable: true,
    description: 'If the payment has been processed.',
  })
  processed?: boolean;

  @Field(() => String, {
    nullable: false,
    description: 'The unique email identifier from the payment email.',
  })
  emailId!: string;

  @Field(() => PaymentProvider, {
    nullable: false,
    description: 'The payment provider.',
  })
  provider!: PaymentProvider;

  @Field(() => String, {
    nullable: false,
    description: 'The unique transaction id from the payment email.',
  })
  transactionId?: string;

  @Field(() => String, {
    nullable: false,
    description: 'The name of the user that sent the payment.',
  })
  senderName!: string;
}

@ObjectType({
  description: 'The created payment object.',
})
export class CreatedPaymentResponse {
  @Field(() => Boolean, {
    nullable: false,
    description: 'Whether or not the payment was created',
  })
  success!: boolean;

  @Field(() => Payment, {
    nullable: false,
    description: 'The created payment object.',
  })
  payment!: Payment;
}

@InputType({
  description: 'Input type for marking a payment as processed.',
})
export class MarkPaymentAsProcessedInput {
  @Field(() => String, {
    nullable: false,
    description: 'The payment ID.',
  })
  id!: string;
}

@ObjectType({
  description: 'The updated payment object.',
})
export class MarkPaymentAsProcessedResponse {
  @Field(() => Boolean, {
    nullable: false,
    description: 'Whether or not the payment was updated',
  })
  success!: boolean;

  @Field(() => Payment, {
    nullable: false,
    description: 'The created payment object.',
  })
  payment!: Payment;
}

@InputType({
  description: 'Input type for getting payments.',
})
export class GetPaymentsInput {
  @Field(() => Boolean, {
    nullable: true,
    description: 'Whether or not the payment is processed.',
  })
  processed?: boolean;

  @Field(() => PaymentProvider, {
    nullable: true,
    description: 'The provider of the payment.',
  })
  paymentProvider?: PaymentProvider;
}
