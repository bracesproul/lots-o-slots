import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToOne } from 'typeorm';
import { MainEntity, Transaction } from '@/entities';

@Entity({ name: 'bank_of_america_transactions' })
@ObjectType({
  implements: MainEntity.objectTypeImplements,
})
export default class BankOfAmericaTransaction extends MainEntity {
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

  @OneToOne(() => Transaction)
  transaction!: Transaction;

  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'uuid', nullable: false })
  transactionId!: string;
}
