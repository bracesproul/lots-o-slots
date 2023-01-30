import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { MainEntity } from '@/entities';

@Entity({ name: 'gcp_credentials' })
export default class GcpCredentials extends MainEntity {
  @Column({ type: 'varchar' })
  client_id!: string;

  @Column({ type: 'varchar', default: 'lots-o-slots' })
  project_id!: string;

  @Column({
    type: 'varchar',
    default: 'https://accounts.google.com/o/oauth2/auth',
  })
  auth_uri!: string;

  @Column({ type: 'varchar', default: 'https://oauth2.googleapis.com/token' })
  token_uri!: string;

  @Column({
    type: 'varchar',
    default: 'https://www.googleapis.com/oauth2/v1/certs',
  })
  auth_provider_x509_cert_url!: string;

  @Column({ type: 'varchar' })
  client_secret!: string;

  @Column({ type: 'varchar', default: 'http://localhost' })
  redirect_uris!: string;
}
