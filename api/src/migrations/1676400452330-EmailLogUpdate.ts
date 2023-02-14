import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmailLogUpdate1676400452330 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."email_log_type_enum" AS ENUM('ZELLE', 'PAYPAL', 'CASHAPP', 'BTC', 'ETH', 'NO_PROVIDER')`
    );
    await queryRunner.query(`
        ALTER TABLE "email_log"
        ADD COLUMN "type" "public"."email_log_type_enum"
    `);
    await queryRunner.query(`
        ALTER TABLE "email_log"
        ADD COLUMN "processed" BOOLEAN
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "email_log"
        DROP COLUMN "type" "public"."email_log_type_enum"
    `);
    await queryRunner.query(`
        ALTER TABLE "email_log"
        DROP COLUMN "processed"
    `);
    await queryRunner.query(`DROP TYPE "public"."email_log_type_enum"`);
  }
}
