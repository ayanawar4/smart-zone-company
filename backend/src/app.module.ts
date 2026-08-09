import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsModule } from './projects/projects.module';
import { FundModule } from './fund/fund.module';
import { ExpensesModule } from './expenses/expenses.module';
import { SalariesModule } from './salaries/salaries.module';
import { InvoicesModule } from './invoices/invoices.module';
import { EmployeesModule } from './employees/employees.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
