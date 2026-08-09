import { Module } from '@nestjs/common';
import { ProjectsModule } from '../projects/projects.module';
import { FundModule } from '../fund/fund.module';
import { ExpensesModule } from '../expenses/expenses.module';
import { SalariesModule } from '../salaries/salaries.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { EmployeesModule } from '../employees/employees.module';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [ProjectsModule, FundModule, ExpensesModule, SalariesModule, InvoicesModule, EmployeesModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
