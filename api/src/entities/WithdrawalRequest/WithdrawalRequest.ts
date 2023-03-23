import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MainEntity, UserV2 } from '@/entities';
import { WithdrawalRequestStatus } from './types';
import { PaymentProvider } from '@/entities/Payment/Payment';

@Entity({ name: 'withdrawal_requests' })
@ObjectType({
  implements: MainEntity.objectTypeImplements,
})
export default class WithdrawalRequest extends MainEntity {
  @ManyToOne(() => UserV2, (user) => user.withdrawalRequests)
  @JoinColumn({ name: 'userId' })
  user!: UserV2;

  @Field(() => ID, {
    nullable: false,
  })
  @Column({
    type: 'uuid',
  })
  userId!: string;

  @Field(() => WithdrawalRequestStatus, {
    nullable: false,
  })
  @Column({
    type: 'enum',
    nullable: false,
    enum: WithdrawalRequestStatus,
    default: WithdrawalRequestStatus.PENDING,
  })
  status!: WithdrawalRequestStatus;

  @Field(() => Number, {
    nullable: false,
  })
  @Column({
    type: 'numeric',
  })
  amount!: number;

  @Field(() => PaymentProvider, {
    nullable: false,
  })
  @Column({
    type: 'enum',
    enum: PaymentProvider,
    nullable: false,
  })
  payoutMethod!: PaymentProvider;

  @Field(() => String, {
    nullable: false,
  })
  @Column({
    type: 'varchar',
  })
  payoutAddress!: string;
}
