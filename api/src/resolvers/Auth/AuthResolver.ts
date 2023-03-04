import { Arg, Query, Resolver } from 'type-graphql';
import {
  AuthorizeAdminUserPayload
} from './types';
import { AuthenticationError } from 'apollo-server-express';

@Resolver()
export class AuthResolver {
  @Query(() => AuthorizeAdminUserPayload, { nullable: false })
  async checkAdminPagePassword(
    @Arg('password', { nullable: false }) password: string
  ): Promise<AuthorizeAdminUserPayload> {
    const realPassword = process.env.ADMIN_PAGE_PASSWORD;
    if (!realPassword) {
      throw new Error('No password found');
    }
    if (password !== realPassword) {
      throw new AuthenticationError('Incorrect password');
    }
    return {
      success: true,
    };
  }
}
