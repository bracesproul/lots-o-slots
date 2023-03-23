import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToOne } from 'typeorm';
import { MainEntity, Transaction } from '@/entities';

@Entity({ name: 'cash_app_transactions' })
@ObjectType({
  implements: MainEntity.objectTypeImplements,
})
export default class CashAppTransaction extends MainEntity {
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
  cashtag!: string;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  cashAppId?: string;
}
