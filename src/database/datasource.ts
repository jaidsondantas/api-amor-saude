import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const source = new DataSource({
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'admin',
  synchronize: true,
  database: 'db_amor_saude',
  entities: ['src/**/*.entity.ts'],
  migrationsTableName: 'migrations',
  migrations: ['src/database/migrations/*.ts'],
});
