import { Field, ID, InputType, ObjectType } from 'type-graphql';
import createConnectionType from '../shared/createConnectionType';
import { User } from '@/entities';

@InputType({
  description: 'Input type for creating a user.',
})
export class CreateUserInput {
  @Field(() => String, {
    nullable: false,
    description: 'The unique identifier for the user.',
  })
  userIdentifier!: string;

  @Field(() => Number, {
    nullable: false,
    description: 'The current users ballance.',
  })
  balance!: number;
}
