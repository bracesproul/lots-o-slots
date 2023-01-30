import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { MainEntity } from '@/entities';

@Entity({ name: 'gcp_tokens' })
export default class GcpToken extends MainEntity {
  @Column({ type: 'varchar' })
  type!: string;

  @Column({ type: 'varchar' })
  client_id!: string;

  @Column({ type: 'varchar' })
  client_secret!: string;

  @Column({ type: 'varchar' })
  refresh_token!: string;
}
