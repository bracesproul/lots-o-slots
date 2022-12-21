import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Account } from '@/entities';
import { PaymentProvider, PaymentType } from '@/entities/Payment/Payment';

@InputType({
  description: 'Input type for creating an account.',
})
export class AddAccountInput {
  @Field(() => String, {
    nullable: false,
    description: 'The email address of the account.',
  })
  email!: string;

  @Field(() => String, {
    nullable: true,
    description: 'The cashtag of the account.',
  })
  cashtag?: string;

  @Field(() => Number, {
    nullable: true,
    description: 'The starting balance of the account.',
  })
  balance?: number;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Whether an account can withdrawal funds.',
  })
  canWithdrawal?: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Whether an account can accept funds.',
  })
  canAcceptDeposits?: boolean;

  @Field(() => Number, {
    nullable: true,
    description: 'The amount sent from this account this week',
  })
  weeklyWithdrawals?: number;
}

@ObjectType({
  description: 'All accounts.',
})
export class GetAllAccountsQuery {
  @Field(() => Account, {
    nullable: false,
    description: 'All accounts.',
  })
  accounts!: Account[];
}

@InputType({
  description: 'Input type for getting accounts.',
})
export class GetAllAccountsInput {
  @Field(() => PaymentProvider, {
    nullable: true,
    description: 'The payment provider type.',
  })
  provider?: PaymentProvider;
}

@InputType({
  description: 'Input type for switching the default type account.',
})
export class SwitchDefaultAccountInput {
  @Field(() => ID, {
    nullable: false,
    description: 'The ID of the account.',
  })
  id!: string;

  @Field(() => PaymentProvider, {
    nullable: false,
    description: 'The payment provider of the account.',
  })
  type!: PaymentProvider;
}
