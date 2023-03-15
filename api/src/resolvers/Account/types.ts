import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Account } from '@/entities';
import { PaymentProvider } from '@/entities/Payment/Payment';

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

  @Field(() => String, {
    nullable: true,
    description: 'The bitcoin address of the account.',
  })
  bitcoinAddress?: string;

  @Field(() => String, {
    nullable: true,
    description: 'The ethereum address of the account.',
  })
  ethereumAddress?: string;

  @Field(() => PaymentProvider, {
    nullable: false,
    description: 'The payment provider of the account.',
  })
  paymentProvider!: PaymentProvider;
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

  @Field(() => Boolean, {
    nullable: true,
    description: 'The default payment providers.',
  })
  defaultAccounts?: boolean;
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

@InputType({
  description: 'Input type for getting an account by its id.',
})
export class GetAccountByIdInput {
  @Field(() => ID)
  id!: string;
}

@InputType({
  description: 'Input type for updating an account.',
})
export class UpdateAccountInput {
  @Field(() => ID)
  id!: string;

  @Field(() => String, {
    nullable: true,
  })
  name?: string;

  @Field(() => String, {
    nullable: true,
  })
  identifier?: string;

  @Field(() => Number, {
    nullable: true,
  })
  balance?: number;

  @Field(() => PaymentProvider)
  type!: PaymentProvider;
}

@InputType({
  description: 'Input type for creating an account.',
})
export class CreateAccountInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  identifier!: string;

  @Field(() => Number)
  balance!: number;

  @Field(() => PaymentProvider)
  type!: PaymentProvider;
}
