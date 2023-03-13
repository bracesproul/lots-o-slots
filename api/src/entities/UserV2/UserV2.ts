import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Unique } from 'typeorm';
import { MainEntity } from '@/entities';
import { UserRole } from './types';

@Entity({ name: 'user_v2' })
@ObjectType({
  implements: MainEntity.objectTypeImplements,
})
export default class UserV2 extends MainEntity {
  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  password?: string;

  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  firstName!: string;

  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  lastName!: string;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  username?: string;

  @Field(() => UserRole, {
    nullable: false,
  })
  @Column({
    type: 'enum',
    nullable: false,
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  @Unique(['supabaseId'])
  supabaseId!: string;
}
