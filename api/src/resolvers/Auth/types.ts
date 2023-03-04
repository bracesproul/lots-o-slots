import { Field, ObjectType } from "type-graphql";

@ObjectType(({
  description: 'The response from the checkAdminPagePassword query',
}))
export class AuthorizeAdminUserPayload {
  @Field(() => Boolean)
  success!: boolean;
}