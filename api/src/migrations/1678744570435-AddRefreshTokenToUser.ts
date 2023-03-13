import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRefreshTokenToUser1678744570435 implements MigrationInterface {
    name = 'AddRefreshTokenToUser1678744570435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_v2" ADD "refreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_v2" DROP COLUMN "refreshToken"`);
    }

}
