import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToOne } from 'typeorm';
import { MainEntity, Transaction } from '@/entities';

@Entity({ name: 'email_log_v2' })
@ObjectType({
  implements: MainEntity.objectTypeImplements,
})
export default class EmailLogV2 extends MainEntity {
  @Field(() => Number, {
    nullable: false,
  })
  @Column({ type: 'numeric', nullable: false })
  emailId!: number;

  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  subject!: string;

  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  body!: string;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  snippet?: string;

  @Field(() => Date, {
    nullable: false,
  })
  @Column({ type: 'timestamp with time zone', nullable: false })
  receivedAt!: Date;

  @OneToOne(() => Transaction, {
    nullable: true,
  })
  transaction?: Transaction;
}
