import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { MainEntity } from '@/entities';

export enum EmailLogType {
  ZELLE = 'ZELLE',
  PAYPAL = 'PAYPAL',
  CASHAPP = 'CASHAPP',
  BTC = 'BTC',
  ETH = 'ETH',
  NO_PROVIDER = 'NO_PROVIDER',
}

registerEnumType(EmailLogType, { name: 'EmailLogType' });

@Entity({ name: 'email_log' })
@ObjectType({
  implements: MainEntity.objectTypeImplements,
})
export default class EmailLog extends MainEntity {
  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  emailId!: string;

  @Field(() => EmailLogType, {
    nullable: true,
  })
  @Column({ type: 'enum', nullable: true, enum: EmailLogType })
  type?: EmailLogType;

  @Field(() => Boolean, {
    nullable: true,
  })
  @Column({ type: 'boolean', nullable: true })
  processed?: boolean;
}
