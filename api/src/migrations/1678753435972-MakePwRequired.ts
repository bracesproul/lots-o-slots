import {MigrationInterface, QueryRunner} from "typeorm";

export class MakePwRequired1678753435972 implements MigrationInterface {
    name = 'MakePwRequired1678753435972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_v2" ALTER COLUMN "password" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_v2" ALTER COLUMN "password" DROP NOT NULL`);
    }

}
