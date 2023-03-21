import faker from 'faker';
import { Payment, User } from '@/entities';
import { getRepository } from 'typeorm';
import { PaymentProvider } from '@/entities/Payment/Payment';
import { PaymentType } from '@/entities/Transaction/types';

export async function seedFakePayments(users: User[]): Promise<Payment[]> {
  const payments: Payment[] = [];
  for (let i = 0; i < 100; i++) {
    payments.push(
      Payment.create({
        userId: faker.random.arrayElement(users).id,
        amount: faker.datatype.number(),
        processed: faker.datatype.boolean(),
        emailId: faker.datatype.uuid(),
        provider: faker.random.arrayElement(Object.values(PaymentProvider)),
        senderName: faker.name.firstName(),
        paymentType: faker.random.arrayElement(Object.values(PaymentType)),
      })
    );
  }
  return getRepository(Payment).save(payments);
}
