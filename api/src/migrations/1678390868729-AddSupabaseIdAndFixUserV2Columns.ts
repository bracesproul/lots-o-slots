import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSupabaseIdAndFixUserV2Columns1678390868729 implements MigrationInterface {
    name = 'AddSupabaseIdAndFixUserV2Columns1678390868729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_v2" ADD "supabaseId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_v2" ADD CONSTRAINT "UQ_01d6c1654af9b3df0908b3151e0" UNIQUE ("supabaseId")`);
        await queryRunner.query(`ALTER TABLE "user_v2" ALTER COLUMN "username" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_v2" ALTER COLUMN "username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_v2" DROP CONSTRAINT "UQ_01d6c1654af9b3df0908b3151e0"`);
        await queryRunner.query(`ALTER TABLE "user_v2" DROP COLUMN "supabaseId"`);
    }

}
