import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './main/auth/auth.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './database/config-database';
import { UsersModule } from './main/users/users.module';
import { CompaniesModule } from './main/companies/companies.module';
import { RegionModule } from './main/region/region.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    AuthModule,
    UsersModule,
    CompaniesModule,
    RegionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
