import { seedDatabase } from '@/seed';
import { Query, Resolver } from 'type-graphql';
import { Transaction } from 'typeorm';

@Resolver()
export class SeedResolver {
  @Transaction()
  @Query(() => Boolean, { nullable: false })
  async seedData(): Promise<boolean> {
    await seedDatabase();
    return true;
  }
}
