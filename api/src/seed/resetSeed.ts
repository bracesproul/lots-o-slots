import { getConnection } from 'typeorm';
import { seedDatabase } from '.';

export async function resetSeed() {
  const queryRunner = getConnection().createQueryRunner();
  await queryRunner.clearTable('payment');
  await queryRunner.clearTable('account');
  await queryRunner.clearTable('user');
  await seedDatabase();
  console.info('✅ Database reset!');
}

resetSeed();
