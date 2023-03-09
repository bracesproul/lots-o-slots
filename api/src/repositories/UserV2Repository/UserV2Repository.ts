import { AbstractRepository, EntityRepository, getCustomRepository } from 'typeorm';
import { UserV2 } from '@/entities';
import { CreateUserInput, CreateUserResponse, LoginUserInput, LoginUserResponse, UpdateUserInput, UpdateUserResponse } from './types';
import { UserInputError } from 'apollo-server-express';
import { SupabaseAuth } from '@/services/subabase';
import { UserV2LoginLogRepository } from '../UserV2LoginLogRepository';
import { UserRole } from '@/entities/UserV2/types';

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
      where: { id }
    });
  }

  async signUp(input: CreateUserInput): Promise<CreateUserResponse> {
    const { email, password, data } = input;
    const { firstName, lastName } = data;
  
    const checkIfUserExists = await this.repository.findOne({
      where: { email }
    });

    if (checkIfUserExists) {
      throw new UserInputError('User already exists');
    }

    const supabaseUser = await new SupabaseAuth().signUp({
      email,
      password,
      data,
    });

    const user = await this.repository.create({
      email,
      password,
      firstName,
      lastName,
      username: data.username,
      role: data.role,
    }).save();

    await getCustomRepository(UserV2LoginLogRepository).updateLog(user.id);

    return {
      supabaseUserResponse: supabaseUser,
      user,
    }
  }

  async login(input: LoginUserInput): Promise<LoginUserResponse> {
    const { email, password } = input;
    const user = await this.repository.findOne({
      where: [{ email }, { username: email }]
    });

    if (!user) {
      throw new UserInputError('User not found.');
    }

    const supabaseUserResponse = await new SupabaseAuth().login({
      email: user.email,
      password,
    });

    await getCustomRepository(UserV2LoginLogRepository).updateLog(user.id);

    return {
      supabaseUserResponse,
      user,
    }
  }

  async update(input: UpdateUserInput): Promise<UpdateUserResponse> {
    const { id } = input;
    const checkIfUserExists = await this.repository.findOne({
      where: { id }
    });

    if (!checkIfUserExists) {
      throw new UserInputError('User not found.');
    }

    await new SupabaseAuth().update(input);

    const updatedUser = await this.repository.create({
      ...checkIfUserExists,
      ...input,
    }).save()

    return {
      user: updatedUser,
    }
  }

  async delete(id: string): Promise<boolean> {
    // todo: implement
    return false;
  }
}
