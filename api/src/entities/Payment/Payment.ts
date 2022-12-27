import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { MainEntity, User } from '@/entities';

export enum PaymentProvider {
  PAYPAL = 'PAYPAL',
  CASHAPP = 'CASHAPP',
  ZELLE = 'ZELLE',
  BITCOIN = 'BITCOIN',
  ETHEREUM = 'ETHEREUM',
}

export enum PaymentType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  PAYOUT = 'PAYOUT',
}

export enum GameType {
  SLOTS = 'SLOTS',
  POKER = 'POKER',
}

registerEnumType(PaymentProvider, { name: 'PaymentProvider' });
registerEnumType(PaymentType, { name: 'PaymentType' });
registerEnumType(GameType, { name: 'GameType' });

@Entity({ name: 'payment' })
@ObjectType({
  implements: MainEntity.objectTypeImplements,
})
export default class Payment extends MainEntity {
  @ManyToOne(() => User)
  user!: User;

  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'uuid', nullable: false })
  userId!: string;

  @Field(() => Number, {
    nullable: false,
  })
  @Column({ type: 'numeric', nullable: false })
  amount!: number;

  @Field(() => Boolean, {
    nullable: false,
  })
  @Column({ type: 'boolean', nullable: false })
  processed!: boolean;

  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  emailId!: string;

  @Field(() => PaymentProvider, {
    nullable: false,
  })
  @Column({ type: 'enum', enum: PaymentProvider, nullable: false })
  provider!: PaymentProvider;

  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  senderName!: string;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  transactionId?: string;

  @Field(() => PaymentType, {
    nullable: false,
  })
  @Column({ type: 'enum', enum: PaymentType, nullable: false })
  paymentType!: PaymentType;
}
