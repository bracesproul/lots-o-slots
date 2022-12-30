import { seedFakeUsers } from './users';
import { seedFakePayments } from './payments';
import { seedFakeAccounts } from './accounts';

export async function seedDatabase() {
  // if (process.env.NODE_ENV !== 'development') {
  //   console.warn(
  //     '❌ Database seeding is only available in development mode',
  //     process.env.NODE_ENV
  //   );
  //   return;
  // }
  // try {
  //   const users = await seedFakeUsers();
  //   await seedFakePayments(users);
  //   await seedFakeAccounts();
  //   console.info('✅ Database seeded!');
  // } catch (e) {
  //   console.error(e);
  // }
}

seedDatabase();
