import { Field, ID, InterfaceType } from 'type-graphql';
import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@InterfaceType({
  description: 'ID',
  isAbstract: true,
})
export default abstract class Node extends BaseEntity {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static objectTypeImplements: Function[] = [Node];

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;
}
