import { seedFakeUsers } from './users';
import { seedFakePayments } from './payments';
import { seedFakeAccounts } from './accounts';
import postgresConnection from '@/config/typeorm';
import { ConnectionManager } from 'typeorm';

export async function seedDatabase() {
  if (process.env.NODE_ENV !== 'development') {
    console.warn(
      '❌ Database seeding is only available in development mode',
      process.env.NODE_ENV
    );
    return;
  }
  const connectionManager = new ConnectionManager();
  if (!connectionManager.has('default')) {
    console.warn('NO DEFAULT FOUND (seed)');
    await postgresConnection().then(async () => {
      console.info('🤠 Database connected! (inside authorize function)');
    });
  }

  const users = await seedFakeUsers();
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
