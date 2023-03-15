import { UserV2 } from '@/entities';
import { UserRole } from '@/entities/UserV2/types';
import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType({
  description: 'Response type for creating a new user with Supabase',
})
class SupabaseSessionResponse {
  @Field(() => String, {
    nullable: true,
    description:
      'The oauth provider token. If present, this can be used to make external API requests to the oauth provider used.',
  })
  provider_token?: string | null;

  @Field(() => String, {
    nullable: true,
    description: `The oauth provider refresh token. If present, this can be used to refresh the provider_token via the oauth provider's API. Not all oauth providers return a provider refresh token. If the provider_refresh_token is missing, please refer to the oauth provider's documentation for information on how to obtain the provider refresh token.`,
  })
  provider_refresh_token?: string | null;

  @Field(() => String, {
    nullable: false,
    description:
      'The access token jwt. It is recommended to set the JWT_EXPIRY to a shorter expiry value.',
  })
  access_token!: string;

  @Field(() => String, {
    nullable: false,
    description: 'A one-time used refresh token that never expires.',
  })
  refresh_token!: string;

  @Field(() => Number, {
    nullable: false,
    description:
      'The number of seconds until the token expires (since it was issued). Returned when a login is confirmed.',
  })
  expires_in!: number;

  @Field(() => Number, {
    nullable: false,
    description:
      'A timestamp of when the token will expire. Returned when a login is confirmed.',
  })
  expires_at?: number;

  @Field(() => String, {
    nullable: false,
    description: 'The type of token. Returned when a login is confirmed.',
  })
  token_type!: string;
}

@ObjectType({
  description: 'Response type for creating a new user',
})
export class SignUpPayload {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => SupabaseSessionResponse, {
    nullable: false,
  })
  session!: SupabaseSessionResponse;

  @Field(() => UserV2, {
    nullable: false,
  })
  user!: UserV2;
}

@InputType({
  description: 'Additional user data',
})
export class UserData {
  @Field(() => String)
  firstName!: string;

  @Field(() => String)
  lastName!: string;

  @Field(() => UserRole)
  role!: UserRole;

  @Field(() => String, {
    nullable: true,
  })
  username?: string;
}

@InputType({
  description: 'Input type for creating a new user',
})
export class SignUpInput {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;

  @Field(() => UserData)
  data!: UserData;
}

@InputType({
  description: 'Input type for logging in a user',
})
export class LoginInput {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}

@ObjectType({
  description: 'Response type for logging in a user',
})
export class LoginPayload {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => SupabaseSessionResponse, {
    nullable: false,
  })
  session!: SupabaseSessionResponse;

  @Field(() => UserV2, {
    nullable: false,
  })
  user!: UserV2;
}

@InputType({
  description: 'Input type for updating a new user',
})
export class UpdateInput {
  @Field(() => String)
  supabaseId!: string;

  @Field(() => String, {
    nullable: true,
  })
  email?: string;

  @Field(() => String, {
    nullable: true,
  })
  password?: string;

  @Field(() => UserData, {
    nullable: true,
  })
  data?: UserData;
}

@ObjectType({
  description: 'Input type for updating a user',
})
export class UpdatePayload {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => UserV2, {
    nullable: false,
  })
  user!: UserV2;
}

@ObjectType({
  description: 'Response type for checking a user session',
})
export class CheckSessionPayload {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => UserV2, {
    nullable: false,
  })
  user!: UserV2;

  @Field(() => String, {
    nullable: false,
  })
  refreshToken!: string;
}

@ObjectType({
  description: 'Response type for logging out a user',
})
export class LogoutPayload {
  @Field(() => Boolean)
  success!: boolean;
}
