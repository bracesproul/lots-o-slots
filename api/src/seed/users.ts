import faker from 'faker';
import { User } from '@/entities';
import { getRepository } from 'typeorm';

export async function seedFakeUsers(): Promise<User[]> {
  const userRepository = getRepository(User);
  const users: User[] = [];
  for (let i = 0; i < 5; i++) {
    users.push(
      userRepository.create({
        userIdentifier_zelle: `${faker.name.firstName()}_${faker.name.lastName()}`,
        balance: faker.datatype.number(),
      })
    );
  }
  return userRepository.save(users);
}
