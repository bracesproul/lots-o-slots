import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUserLogsColumnNames1678322670760 implements MigrationInterface {
  name = 'FixUserLogsColumnNames1678322670760';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_v2_login_log" RENAME COLUMN "login" TO "loginDate"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_v2_login_log" RENAME COLUMN "loginDate" TO "login"`
    );
  }
}
