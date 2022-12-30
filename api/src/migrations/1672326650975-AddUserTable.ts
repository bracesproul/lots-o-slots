import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1672326650975 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD COLUMN "email" character varying;
    `);

    await queryRunner.query(`
      ALTER TABLE "user"
      ADD COLUMN "password" character varying;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //no-op
  }
}
