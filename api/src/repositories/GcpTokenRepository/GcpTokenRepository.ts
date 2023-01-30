import { AbstractRepository, EntityRepository } from 'typeorm';
import { GcpToken } from '@/entities';

@EntityRepository(GcpToken)
export default class GcpTokenRepository extends AbstractRepository<GcpToken> {}
