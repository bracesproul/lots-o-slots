import {MigrationInterface, QueryRunner} from "typeorm";

export class MissingMigrations1678318983564 implements MigrationInterface {
    name = 'MissingMigrations1678318983564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."payment_provider_enum_old" RENAME TO "payment_provider_enum_old_old"`);
        await queryRunner.query(`CREATE TYPE "public"."payment_provider_enum" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM')`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "provider" TYPE "public"."payment_provider_enum" USING "provider"::"text"::"public"."payment_provider_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payment_provider_enum_old_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payment_provider_enum_old_old" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM')`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "provider" TYPE "public"."payment_provider_enum_old_old" USING "provider"::"text"::"public"."payment_provider_enum_old_old"`);
        await queryRunner.query(`DROP TYPE "public"."payment_provider_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."payment_provider_enum_old_old" RENAME TO "payment_provider_enum_old"`);
    }

}
