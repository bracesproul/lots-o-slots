import faker from 'faker';
import { Account } from '@/entities';
import { getRepository } from 'typeorm';
import { PaymentProvider } from '@/entities/Payment/Payment';

export async function seedFakeAccounts(): Promise<Account[]> {
  const accounts: Account[] = [];
  for (let i = 0; i < 10; i++) {
    const type = faker.random.arrayElement(Object.values(PaymentProvider));
    accounts.push(
      Account.create({
        email: faker.internet.email(),
        balance: faker.datatype.number(),
        dailyWithdrawals: faker.datatype.number({
          min: 0,
          max: 2000,
        }),
        weeklyWithdrawals: faker.datatype.number({
          min: 0,
          max: 5000,
        }),
        canWithdrawal: faker.datatype.boolean(),
        type,
        cashtag: type ? faker.name.firstName() : undefined,
      })
    );
  }
  return getRepository(Account).save(accounts);
}
