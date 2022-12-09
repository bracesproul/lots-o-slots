import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1670541261554 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE "user" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "created_at" timestamp NOT NULL DEFAULT now(),
      "updated_at" timestamp DEFAULT now(),
      "deleted_at" timestamp,
      "userIdentifier" varchar NOT NULL,
      "balance" numeric NOT NULL,
      PRIMARY KEY ("id")
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no-op
  }
}
