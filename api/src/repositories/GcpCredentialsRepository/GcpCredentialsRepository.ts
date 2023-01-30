import { AbstractRepository, EntityRepository } from 'typeorm';
import { GcpCredentials } from '@/entities';

@EntityRepository(GcpCredentials)
// eslint-disable-next-line max-len
export default class GcpCredentialsRepository extends AbstractRepository<GcpCredentials> {
  async getCredentials(): Promise<GcpCredentials> {
    const credentials = await this.repository.findOne();
    if (!credentials) {
      throw new Error('No credentials found');
    }
    return credentials;
  }
}
