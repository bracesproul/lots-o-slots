import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { MainEntity } from '@/entities';

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
}
