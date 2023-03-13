import {
  AbstractRepository,
  EntityRepository,
  getCustomRepository,
} from 'typeorm';
import { UserV2 } from '@/entities';
import {
  CreateUserInput,
  CreateUserResponse,
  LoginUserInput,
  LoginUserResponse,
  UpdateUserInput,
  UpdateUserResponse,
} from './types';
import { UserInputError } from 'apollo-server-express';
import { SupabaseAuth } from '@/services/subabase';
import { UserV2LoginLogRepository } from '../UserV2LoginLogRepository';
import cookie from 'cookie';
import { GraphQLError } from 'graphql';
import { Response } from 'express';
import {
  SUPABASE_REFRESH_TOKEN_COOKIE_KEY,
  SUPABASE_REFRESH_TOKEN_COOKIE_KEY_NO_LS,
  SUPABASE_USER_ID_COOKIE_KEY,
} from '@/config/auth';

@EntityRepository(UserV2)
export default class UserV2Repository extends AbstractRepository<UserV2> {
  async getAll(): Promise<UserV2[]> {
    return this.repository
      .createQueryBuilder('user')
      .addSelect('"user"."createdAt"', 'createdAt')
      .addOrderBy('"createdAt"', 'ASC')
      .getMany();
  }

  async getById(id: string): Promise<UserV2> {
    return this.repository.findOneOrFail({
      where: { id },
    });
  }

  async getBySupabaseId(supabaseId: string): Promise<UserV2> {
    return this.repository.findOneOrFail({
      where: { supabaseId },
    });
  }

  async signUp(
    input: CreateUserInput,
    res: Response
  ): Promise<CreateUserResponse> {
    const { email, password, data } = input;
    const { firstName, lastName } = data;

    const checkIfUserExists = await this.repository.findOne({
      where: { email },
    });

    if (checkIfUserExists) {
      throw new UserInputError('User already exists');
    }

    const supabaseUser = await new SupabaseAuth().signUp({
      email,
      password,
      data,
    });

    const user = await this.repository
      .create({
        email,
        password,
        firstName,
        lastName,
        username: data.username,
        role: data.role,
        supabaseId: supabaseUser.user.id,
      })
      .save();

    await getCustomRepository(UserV2LoginLogRepository).updateLog(user.id);

    // Update refresh token in DB
    await this.repository
      .create({
        ...user,
        refreshToken: supabaseUser.session.refresh_token,
      })
      .save();

    // Set refresh token in cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize(
        SUPABASE_REFRESH_TOKEN_COOKIE_KEY_NO_LS,
        supabaseUser.session.refresh_token,
        {
          path: '/',
          sameSite: 'strict',
        }
      )
    );

    await user.reload();

    return {
      supabaseUserResponse: supabaseUser,
      user,
    };
  }

  async login(
    input: LoginUserInput,
    res: Response
  ): Promise<LoginUserResponse> {
    const { email, password } = input;
    const user = await this.repository.findOne({
      where: [{ email }, { username: email }],
    });

    if (!user) {
      throw new UserInputError('User not found.');
    }

    const supabaseUserResponse = await new SupabaseAuth().login({
      email: user.email,
      password,
    });

    await getCustomRepository(UserV2LoginLogRepository).updateLog(user.id);

    // Update refresh token in DB
    await this.repository
      .create({
        ...user,
        refreshToken: supabaseUserResponse.session.refresh_token,
      })
      .save();

    await user.reload();

    // Set refresh token & user id in cookie
    // this.setUserIdCookie(supabaseUserResponse.session.user.id, res);
    // this.setRefreshTokenCookie(user.refreshToken ?? '', res);

    return {
      supabaseUserResponse,
      user,
    };
  }

  async update(input: UpdateUserInput): Promise<UpdateUserResponse> {
    const { id } = input;
    const checkIfUserExists = await this.repository.findOne({
      where: { id },
    });

    if (!checkIfUserExists) {
      throw new UserInputError('User not found.');
    }

    await new SupabaseAuth().update(input);

    const updatedUser = await this.repository
      .create({
        ...checkIfUserExists,
        ...input,
      })
      .save();

    return {
      user: updatedUser,
    };
  }

  async delete(id: string): Promise<boolean> {
    // todo: implement
    return false;
  }

  async refreshSession(
    input: { refreshToken: string; user: UserV2 },
    res: Response
  ) {
    // Checks to make sure the refresh token matches the most recent users refresh token
    const { refreshToken: previousRefreshToken } = input.user;
    if (previousRefreshToken !== input.refreshToken) {
      this.setRefreshTokenCookie('', res);
      throw new GraphQLError('Refresh token does not match');
    }
    // Update the session with Supabase
    const { session, user } = await new SupabaseAuth().refreshSession(
      input.refreshToken
    );
    if (!session || !user) {
      this.setRefreshTokenCookie('', res);
      throw new GraphQLError('Session not found');
    }
    // Update the user with the new refresh token
    const updatedUser = await this.repository
      .create({
        ...input.user,
        refreshToken: session.refresh_token,
      })
      .save();
    this.setRefreshTokenCookie(session.refresh_token, res);
    return {
      user: updatedUser,
      refreshToken: session.refresh_token,
    };
  }

  async logout(user: UserV2, res: Response) {
    // Update refresh token in DB
    await this.repository
      .create({
        ...user,
        refreshToken: undefined,
      })
      .save();

    // Delete cookie
    this.setUserIdCookie('', res);
    this.setRefreshTokenCookie('', res);

    await user.reload();
  }

  setUserIdCookie(userId: string, res: Response) {
    /* remove cookies from request header */
    res.cookie(SUPABASE_USER_ID_COOKIE_KEY, userId, {
      path: '/',
      httpOnly: false,
    });
  }

  setRefreshTokenCookie(refreshToken: string, res: Response) {
    /* remove cookies from request header */
    res.cookie(SUPABASE_REFRESH_TOKEN_COOKIE_KEY, refreshToken, {
      path: '/',
      httpOnly: false,
    });
  }
}
