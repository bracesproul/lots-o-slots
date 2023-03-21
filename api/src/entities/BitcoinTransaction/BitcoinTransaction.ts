import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToOne } from 'typeorm';
import { MainEntity, Transaction } from '@/entities';

@Entity({ name: 'bitcoin_transactions' })
@ObjectType({
  implements: MainEntity.objectTypeImplements,
})
export default class BitcoinTransaction extends MainEntity {
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
  walletAddress!: string;
}
