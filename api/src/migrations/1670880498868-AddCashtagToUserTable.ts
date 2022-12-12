import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCashtagToUserTable1670880498868 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "cashTag" character varying NULL;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no need to revert this method
  }
}
