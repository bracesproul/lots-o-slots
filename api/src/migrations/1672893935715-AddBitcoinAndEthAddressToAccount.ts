import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBitcoinAndEthAddressToAccount1672893935715
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "account"
        ADD COLUMN "bitcoinAddress" character varying NULL
    `);
    await queryRunner.query(`
        ALTER TABLE "account"
        ADD COLUMN "ethereumAddress" character varying NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no-op
  }
}
