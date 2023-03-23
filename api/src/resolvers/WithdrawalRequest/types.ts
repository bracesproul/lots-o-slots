import { WithdrawalRequest } from '@/entities';
import { PaymentProvider } from '@/entities/Payment/Payment';
import { UserRole } from '@/entities/UserV2/types';
import { WithdrawalRequestStatus } from '@/entities/WithdrawalRequest/types';
import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType({
  description: 'Response type for creating a new user',
})
export class UpdateWithdrawalRequestStatusPayload {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => WithdrawalRequest, {
    nullable: false,
  })
  withdrawalRequest!: WithdrawalRequest;
}

@InputType({
  description: 'Input type for updating a withdrawal requests status',
})
export class UpdateWithdrawalRequestStatusInput {
  @Field(() => ID)
  id!: string;

  @Field(() => WithdrawalRequestStatus)
  status!: WithdrawalRequestStatus;
}

@ObjectType({
  description: 'Response type for creating a new withdrawal request',
})
export class CreateWithdrawalRequestPayload {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => WithdrawalRequest, {
    nullable: false,
  })
  withdrawalRequest!: WithdrawalRequest;
}

@InputType({
  description: 'Input type for creating a new withdrawal request',
})
export class CreateWithdrawalRequestInput {
  @Field(() => ID)
  userId!: string;

  @Field(() => Number)
  amount!: number;

  @Field(() => String)
  payoutAddress!: string;

  @Field(() => PaymentProvider)
  payoutMethod!: PaymentProvider;

  @Field(() => WithdrawalRequestStatus, {
    nullable: true,
    defaultValue: WithdrawalRequestStatus.PENDING,
  })
  status?: WithdrawalRequestStatus;
}

@ObjectType({
  description: 'Response type for deleting a withdrawal request',
})
export class DeleteWithdrawalRequestPayload {
  @Field(() => Boolean)
  success!: boolean;
}
