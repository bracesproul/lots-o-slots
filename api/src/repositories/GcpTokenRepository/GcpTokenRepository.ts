import { AbstractRepository, EntityRepository } from 'typeorm';
import { GcpToken } from '@/entities';

@EntityRepository(GcpToken)
export default class GcpTokenRepository extends AbstractRepository<GcpToken> {
  async findRecent(): Promise<GcpToken | undefined> {
    return this.repository.findOne({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async create(input: Partial<GcpToken>): Promise<GcpToken> {
    const entity = this.repository.create(input);

    return this.repository.save(entity);
  }
}
