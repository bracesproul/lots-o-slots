import faker from 'faker';
import { User } from '@/entities';
import { getRepository } from 'typeorm';

export async function seedFakeUsers(): Promise<User[]> {
  const users: User[] = [];
  for (let i = 0; i < 5; i++) {
    users.push(
      User.create({
        userIdentifier: `${faker.name.firstName()}_${faker.name.lastName()}`,
        balance: faker.datatype.number(),
      })
    );
  }

  return getRepository(User).save(users);
}
