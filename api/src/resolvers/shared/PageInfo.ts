import * as Relay from 'graphql-relay';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class PageInfo implements Relay.PageInfo {
  @Field(() => Boolean, { nullable: false })
  hasNextPage!: boolean;

  @Field(() => Boolean, { nullable: false })
  hasPreviousPage!: boolean;

  @Field(() => String, { nullable: true })
  startCursor!: Relay.ConnectionCursor | null;

  @Field(() => String, { nullable: true })
  endCursor!: Relay.ConnectionCursor | null;
}
