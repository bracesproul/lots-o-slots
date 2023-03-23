import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnUserV2IsAssigned1679417334283 implements MigrationInterface {
    name = 'AddColumnUserV2IsAssigned1679417334283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_v2" ADD "isAvailable" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TYPE "public"."transactions_paymenttype_enum" RENAME TO "transactions_paymenttype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_paymenttype_enum" AS ENUM('DEPOSIT', 'WITHDRAWAL', 'PAYOUT')`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "paymentType" TYPE "public"."transactions_paymenttype_enum" USING "paymentType"::"text"::"public"."transactions_paymenttype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_paymenttype_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transactions_paymenttype_enum_old" AS ENUM('DEPOSIT', 'WITHDRAWAL')`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "paymentType" TYPE "public"."transactions_paymenttype_enum_old" USING "paymentType"::"text"::"public"."transactions_paymenttype_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_paymenttype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."transactions_paymenttype_enum_old" RENAME TO "transactions_paymenttype_enum"`);
        await queryRunner.query(`ALTER TABLE "user_v2" DROP COLUMN "isAvailable"`);
    }

}
