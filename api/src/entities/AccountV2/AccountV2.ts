import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { MainEntity } from '@/entities';
import { PaymentProvider } from '@/entities/Payment/Payment';

@Entity({ name: 'account_v2' })
@ObjectType({
  implements: MainEntity.objectTypeImplements,
})
export default class AccountV2 extends MainEntity {
  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  accountIdentifier!: string;

  @Field(() => Number, {
    nullable: false,
  })
  @Column({ type: 'numeric', nullable: false })
  balance!: number;

  @Field(() => PaymentProvider, {
    nullable: false,
  })
  @Column({ type: 'enum', enum: PaymentProvider, nullable: false })
  type!: PaymentProvider;

  @Field(() => Boolean, {
    nullable: false,
    defaultValue: false,
  })
  @Column({ type: 'boolean', nullable: false, default: false })
  defaultAccount!: boolean;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  name?: string;
}
