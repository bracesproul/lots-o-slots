import { seedDatabase } from '@/seed';
import { Query, Resolver } from 'type-graphql';

@Resolver()
export class SeedResolver {
  @Query(() => Boolean, { nullable: false })
  async seedData(): Promise<boolean> {
    await seedDatabase();
    return true;
  }
}
