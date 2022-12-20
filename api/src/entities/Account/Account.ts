import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { MainEntity } from '@/entities';
import { PaymentProvider } from '@/entities/Payment/Payment';

@Entity({ name: 'account' })
@ObjectType({
  implements: MainEntity.objectTypeImplements,
})
export default class Account extends MainEntity {
  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  email!: string;

  @Field(() => Number, {
    nullable: false,
  })
  @Column({ type: 'numeric', nullable: false })
  balance!: number;

  @Field(() => Number, {
    nullable: false,
  })
  @Column({ type: 'numeric', nullable: false })
  dailyWithdrawals!: number;

  @Field(() => Number, {
    nullable: false,
  })
  @Column({ type: 'numeric', nullable: false })
  weeklyWithdrawals!: number;

  @Field(() => Boolean, {
    nullable: false,
  })
  @Column({ type: 'boolean', nullable: false })
  canWithdrawal!: boolean;

  @Field(() => PaymentProvider, {
    nullable: false,
  })
  @Column({ type: 'enum', enum: PaymentProvider, nullable: false })
  type!: PaymentProvider;

  @Field(() => Boolean, {
    nullable: false,
  })
  @Column({ type: 'boolean', nullable: false })
  canAcceptDeposits!: boolean;

  @Field(() => Boolean, {
    nullable: true,
  })
  @Column({ type: 'boolean', nullable: true })
  defaultAccount?: boolean;
}
