import { Field, InterfaceType } from 'type-graphql';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import Node from '../Node/Node';

@InterfaceType({
  description: 'An object with standard fields for created and updated data',
  isAbstract: true,
  implements: Node.objectTypeImplements,
})
export default abstract class MainEntity extends Node {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static objectTypeImplements: Function[] = [
    ...Node.objectTypeImplements,
    MainEntity,
  ];

  @Field(() => Date, {
    nullable: false,
  })
  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  createdAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
    default: null,
  })
  updatedAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
    default: null,
  })
  deletedAt!: Date | null;
}
