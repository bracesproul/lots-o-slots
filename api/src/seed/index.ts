import { seedFakeUsers } from './users';
import { seedFakePayments } from './payments';
import { seedFakeAccounts } from './accounts';
import postgresConnection from '@/config/typeorm';

export async function seedDatabase() {
  if (process.env.NODE_ENV !== 'development') {
    console.warn(
      '❌ Database seeding is only available in development mode',
      process.env.NODE_ENV
    );
    return;
  }
  await postgresConnection().then(async () => {
    console.info('🤠 Database connected!');
  });
  const users = await seedFakeUsers();
  console.log('saved users', users);
  await seedFakePayments(users);
  await seedFakeAccounts();
  console.info('✅ Database seeded!');
}

if (require.main === module) {
  console.time('seed');
  seedDatabase()
    .then(() => {
      console.timeEnd('seed');
    })
    .catch((error) => {
      console.error(error);
    });
}
