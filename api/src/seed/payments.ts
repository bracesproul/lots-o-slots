import faker from 'faker';
import { Payment, User } from '@/entities';
import { getRepository } from 'typeorm';
import { PaymentProvider } from '@/entities/Payment/Payment';

export async function seedFakePayments(users: User[]): Promise<Payment[]> {
  const payments: Payment[] = [];
  for (let i = 0; i < 25; i++) {
    payments.push(
      Payment.create({
        userId: faker.random.arrayElement(users).id,
        amount: faker.datatype.number(),
        processed: faker.datatype.boolean(),
        emailId: faker.datatype.uuid(),
        provider: faker.random.arrayElement(Object.values(PaymentProvider)),
      })
    );
  }
  return getRepository(Payment).save(payments);
}
