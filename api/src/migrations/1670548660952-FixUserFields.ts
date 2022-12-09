import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUserFields1670548660952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "created_at" TO "createdAt"`
    );

    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "updated_at" TO "updatedAt"`
    );

    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "deleted_at" TO "deletedAt"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No need to revert this migration
  }
}
