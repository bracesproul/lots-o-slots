import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { MainEntity } from '@/entities';

@Entity({ name: 'user' })
@ObjectType({
  implements: MainEntity.objectTypeImplements,
})
export default class User extends MainEntity {
  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  userIdentifier_zelle?: string;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  userIdentifier_paypal?: string;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  userIdentifier_cashapp?: string;

  @Field(() => Number, {
    nullable: false,
  })
  @Column({ type: 'numeric', nullable: false })
  balance!: number;
}
