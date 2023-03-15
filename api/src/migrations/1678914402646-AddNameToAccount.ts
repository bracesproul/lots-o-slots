import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNameToAccount1678914402646 implements MigrationInterface {
    name = 'AddNameToAccount1678914402646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "name"`);
    }

}
