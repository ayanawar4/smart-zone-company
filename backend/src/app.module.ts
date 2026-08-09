import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { existsSync } from 'fs';
import { join } from 'path';

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
    ...(existsSync(join(__dirname, '..', '..', 'frontend', 'dist'))
      ? [
          ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
            exclude: ['/api/{*splat}'],
          }),
        ]
      : []),
    TypeOrmModule.forRoot({
      type: 'sqljs',
      autoSave: true,
      location: join(__dirname, '..', 'data', 'smartzone.sqlite'),
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
