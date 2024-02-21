import { QueryRunner, TableColumn, TableForeignKey } from 'typeorm';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../main/users/entities/user.entity';
import { Seed } from '../shared/entities/seed.entity';
import { Region } from '../main/region/entities/region.entity';
import { Company } from '../main/companies/entities/company.entity';

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'admin',
  database: 'db_amor_saude',
  entities: [User, Seed, Region, Company],
  synchronize: false,
};

export const commonColumnsIds: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'int',
    isPrimary: true,
    isGenerated: true,
    generationStrategy: 'increment',
  },
];

export const commonDateColumns: TableColumnOptions[] = [
  {
    name: 'created_at',
    type: 'datetime',
  },
  {
    name: 'updated_at',
    type: 'datetime',
    default: 'now()',
    isNullable: true,
  },
];

export class UsersBy {
  async commonUsersColumns(queryRunner: QueryRunner, table: string) {
    await queryRunner.addColumn(
      table,
      new TableColumn({
        name: 'created_by',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        columnNames: ['created_by'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.addColumn(
      table,
      new TableColumn({
        name: 'updated_by',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        columnNames: ['updated_by'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }
}
