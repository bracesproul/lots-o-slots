import { MigrationInterface, QueryRunner } from 'typeorm';

export class GcpTables1675037556811 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE gcp_service_accounts (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "deletedAt" TIMESTAMP WITH TIME ZONE,
        "type" character varying NOT NULL,
        "project_id" character varying NOT NULL,
        "private_key_id" character varying NOT NULL,
        "private_key" character varying NOT NULL,
        "client_email" character varying NOT NULL,
        "client_id" character varying NOT NULL,
        "auth_uri" character varying NOT NULL,
        "token_uri" character varying NOT NULL,
        "auth_provider_x509_cert_url" character varying NOT NULL,
        "client_x509_cert_url" character varying NOT NULL,
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7434" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE gcp_credentials (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "deletedAt" TIMESTAMP WITH TIME ZONE,
        "client_id" character varying NOT NULL,
        "project_id" character varying NOT NULL,
        "auth_uri" character varying NOT NULL,
        "token_uri" character varying NOT NULL,
        "auth_provider_x509_cert_url" character varying NOT NULL,
        "client_secret" character varying NOT NULL,
        "redirect_uris" character varying NOT NULL,
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7436" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE gcp_tokens (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "deletedAt" TIMESTAMP WITH TIME ZONE,
        "type" character varying NOT NULL,
        "client_id" character varying NOT NULL,
        "client_secret" character varying NOT NULL,
        "refresh_token" character varying NOT NULL,
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7437" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE gcp_service_accounts
    `);
    await queryRunner.query(`
      DROP TABLE gcp_credentials
    `);
    await queryRunner.query(`
      DROP TABLE gcp_tokens
    `);
  }
}
