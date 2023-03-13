import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakePasswordFieldNullable1678668435929
  implements MigrationInterface
{
  name = 'MakePasswordFieldNullable1678668435929';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_v2" ALTER COLUMN "password" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_v2" ALTER COLUMN "password" SET NOT NULL`
    );
  }
}
