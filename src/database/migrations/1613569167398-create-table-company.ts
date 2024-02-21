import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { commonColumnsIds } from '../config-database';

export class CreateCompanyTable1613569167398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'companies',
        columns: [
          ...commonColumnsIds,
          {
            name: 'socialReason',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'fantasyName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cnpj',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'regionId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'inaugurationDate',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'medicalSpecialties',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'companies',
      new TableForeignKey({
        columnNames: ['regionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'regions',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const foreignKey = await queryRunner.getTable('companies');
    const foreignKeyConstraint = foreignKey.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('regionId') !== -1,
    );
    await queryRunner.dropForeignKey('companies', foreignKeyConstraint);
    await queryRunner.dropTable('companies');
  }
}
