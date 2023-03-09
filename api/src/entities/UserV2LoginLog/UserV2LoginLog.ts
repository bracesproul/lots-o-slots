import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { MainEntity, UserV2 } from '@/entities';

@Entity({ name: 'user_v2_login_log' })
@ObjectType({
  implements: MainEntity.objectTypeImplements,
})
export default class UserV2LoginLog extends MainEntity {
  @Field(() => Date, {
    nullable: false,
  })
  @Column({
    type: 'timestamp with time zone',
    nullable: false,
  })
  loginDate!: Date;

  @ManyToOne(() => UserV2)
  user!: UserV2;
  @Column()
  userId!: string;
}
