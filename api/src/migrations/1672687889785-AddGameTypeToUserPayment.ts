import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGameTypeToUserPayment1672687889785
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE "public"."game_type_enum" AS ENUM ('POKER', 'SLOTS');
    `);
    await queryRunner.query(
      `ALTER TABLE "user_payment" ADD COLUMN "gameType" "public"."game_type_enum" NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no-op
  }
}
