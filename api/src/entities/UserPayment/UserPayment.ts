import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { MainEntity, User } from '@/entities';
import { GameType, PaymentProvider } from '../Payment/Payment';

@Entity({ name: 'user_payment' })
@ObjectType({
  implements: MainEntity.objectTypeImplements,
})
export default class UserPayment extends MainEntity {
  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  paymentIdentifier!: string;

  @Field(() => PaymentProvider, {
    nullable: false,
  })
  @Column({ type: 'enum', nullable: false, enum: PaymentProvider })
  paymentProvider!: PaymentProvider;

  @Field(() => Number, {
    nullable: false,
  })
  @Column({ type: 'numeric', nullable: false })
  amount!: number;

  @ManyToOne(() => User, {
    nullable: true,
  })
  user?: User;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  userId?: string;

  @Field(() => Boolean, {
    nullable: false,
  })
  @Column({ type: 'boolean', nullable: false, default: false })
  processed!: boolean;

  @Field(() => GameType, {
    nullable: false,
  })
  @Column({ type: 'enum', nullable: false, enum: GameType })
  gameType!: GameType;
}
