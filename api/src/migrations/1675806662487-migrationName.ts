import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationName1675806662487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "gcp_tokens"
        DROP COLUMN "type"
    `);
    await queryRunner.query(`
        ALTER TABLE "gcp_tokens"
        DROP COLUMN "client_id"
    `);
    await queryRunner.query(`
        ALTER TABLE "gcp_tokens"
        DROP COLUMN "client_secret"
    `);
    await queryRunner.query(`
        ALTER TABLE "gcp_tokens"
        ADD COLUMN "expiry_date" character varying NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE "gcp_tokens"
        ADD COLUMN "access_token" character varying NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE "gcp_tokens"
        ADD COLUMN "token_type" character varying NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "gcp_tokens"
        DROP COLUMN "token_type"
    `);
    await queryRunner.query(`
        ALTER TABLE "gcp_tokens"
        DROP COLUMN "access_token"
    `);
    await queryRunner.query(`
        ALTER TABLE "gcp_tokens"
        DROP COLUMN "expiry_date"
    `);
    await queryRunner.query(`
        ALTER TABLE "gcp_tokens"
        ADD COLUMN "client_secret" character varying NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE "gcp_tokens"
        ADD COLUMN "client_id" character varying NOT NULL
    `);
    await queryRunner.query(`
        ALTER TABLE "gcp_tokens"
        ADD COLUMN "type" character varying NOT NULL
    `);
  }
}
