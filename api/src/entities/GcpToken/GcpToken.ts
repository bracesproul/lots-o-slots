import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { MainEntity } from '@/entities';

@Entity({ name: 'gcp_tokens' })
export default class GcpToken extends MainEntity {
  @Column({ type: 'varchar' })
  token_type!: string;

  @Column({ type: 'varchar' })
  access_token!: string;

  @Column({ type: 'varchar' })
  refresh_token!: string;

  @Column({ type: 'varchar' })
  expiry_date!: string;
}
