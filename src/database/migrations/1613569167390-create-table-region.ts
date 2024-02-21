import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { commonColumnsIds } from '../config-database';

export class CreateRegionTable1613569167390 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'regions',
        columns: [
          ...commonColumnsIds,
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('regions');
  }
}
