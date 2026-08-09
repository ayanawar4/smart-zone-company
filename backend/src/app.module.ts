import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ProjectsModule } from './projects/projects.module';
import { FundModule } from './fund/fund.module';
import { ExpensesModule } from './expenses/expenses.module';
import { SalariesModule } from './salaries/salaries.module';
import { InvoicesModule } from './invoices/invoices.module';
import { EmployeesModule } from './employees/employees.module';
import { DashboardModule } from './dashboard/dashboard.module';

const staticModule = process.env.VERCEL
  ? []
  : [ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'dist'),
      exclude: ['/api/{*splat}'],
    })];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ...staticModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProjectsModule,
    FundModule,
    ExpensesModule,
    SalariesModule,
    InvoicesModule,
    EmployeesModule,
    DashboardModule,
  ],
})
export class AppModule {}
