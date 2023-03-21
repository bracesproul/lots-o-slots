import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToOne } from 'typeorm';
import { MainEntity, Transaction } from '@/entities';

@Entity({ name: 'pay_pal_transactions' })
@ObjectType({
  implements: MainEntity.objectTypeImplements,
})
export default class PaypalTransaction extends MainEntity {
  @OneToOne(() => Transaction)
  transaction!: Transaction;

  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'uuid', nullable: false })
  transactionId!: string;

  @Field(() => Number, {
    nullable: false,
  })
  @Column({ type: 'numeric', nullable: false })
  amount!: number;

  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  senderIdentifier!: string;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  payPalId?: string;
}
