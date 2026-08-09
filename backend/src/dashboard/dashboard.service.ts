import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/project.entity';
import { FundTransaction } from '../fund/fund-transaction.entity';
import { Expense } from '../expenses/expense.entity';
import { Salary } from '../salaries/salary.entity';
import { Invoice } from '../invoices/invoice.entity';
import { Employee } from '../employees/employee.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(FundTransaction) private fundRepo: Repository<FundTransaction>,
    @InjectRepository(Expense) private expenseRepo: Repository<Expense>,
    @InjectRepository(Salary) private salaryRepo: Repository<Salary>,
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
  ) {}

  async getStats() {
    const [projects, fundTx, expenses, salaries, invoices, employees] = await Promise.all([
      this.projectRepo.find(),
      this.fundRepo.find({ order: { id: 'ASC' } }),
      this.expenseRepo.find(),
      this.salaryRepo.find(),
      this.invoiceRepo.find(),
      this.employeeRepo.find(),
    ]);

    const fundBalance = fundTx.length ? fundTx[fundTx.length - 1].balanceAfter : 0;
    const totalFundIn = fundTx.reduce((s, t) => s + (t.amountIn || 0), 0);
    const totalFundOut = fundTx.reduce((s, t) => s + (t.amountOut || 0), 0);

    const totalExpenses = expenses.reduce((s, e) => s + (e.amount || 0), 0);
    const totalSalariesPaid = salaries.reduce((s, s2) => s + (s2.amount || 0), 0);

    const totalInvoiced = invoices.reduce((s, i) => s + (i.total || 0), 0);
    const totalRemainSmartZone = invoices.reduce((s, i) => s + (i.remainSmartZone || 0), 0);
    const invoicesDone = invoices.filter((i) => i.statusDone).length;
    const invoicesUnderConstruction = invoices.filter((i) => i.statusUnderConstruction).length;

    const totalProjectCost = projects.reduce((s, p) => s + (p.projectCostTotal || 0), 0);
    const totalInstallation = projects.reduce((s, p) => s + (p.installationTotal || 0), 0);
    const totalRemainProjects = projects.reduce((s, p) => s + (p.remain || 0), 0);

    // top customers by invoice total
    const byCustomer: Record<string, number> = {};
    for (const inv of invoices) {
      const c = inv.customer || 'Unknown';
      byCustomer[c] = (byCustomer[c] || 0) + (inv.total || 0);
    }
    const topCustomers = Object.entries(byCustomer)
      .map(([customer, total]) => ({ customer, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 8);

    // monthly invoice income (by YYYY-MM from date string)
    const monthly: Record<string, number> = {};
    for (const inv of invoices) {
      if (!inv.date) continue;
      const key = String(inv.date).slice(0, 7);
      monthly[key] = (monthly[key] || 0) + (inv.total || 0);
    }
    const monthlyIncome = Object.entries(monthly)
      .map(([month, total]) => ({ month, total }))
      .sort((a, b) => a.month.localeCompare(b.month));

    // salaries by month/year
    const salByMonth: Record<string, number> = {};
    for (const s of salaries) {
      const key = `${s.year}-${String(s.month).padStart(2, '0')}`;
      salByMonth[key] = (salByMonth[key] || 0) + (s.amount || 0);
    }
    const monthlySalaries = Object.entries(salByMonth)
      .map(([month, total]) => ({ month, total }))
      .sort((a, b) => a.month.localeCompare(b.month));

    // expenses by month
    const expByMonth: Record<string, number> = {};
    for (const e of expenses) {
      if (!e.date) continue;
      const key = String(e.date).slice(0, 7);
      expByMonth[key] = (expByMonth[key] || 0) + (e.amount || 0);
    }
    const monthlyExpenses = Object.entries(expByMonth)
      .map(([month, total]) => ({ month, total }))
      .sort((a, b) => a.month.localeCompare(b.month));

    const projectsSummary = projects
      .map((p) => ({
        id: p.id,
        name: p.name,
        projectCostTotal: p.projectCostTotal,
        installationTotal: p.installationTotal,
        totalPayed: p.totalPayed,
        remain: p.remain,
        status: p.status,
      }))
      .sort((a, b) => b.projectCostTotal - a.projectCostTotal);

    return {
      totals: {
        fundBalance,
        totalFundIn,
        totalFundOut,
        totalExpenses,
        totalSalariesPaid,
        totalInvoiced,
        totalRemainSmartZone,
        totalProjectCost,
        totalInstallation,
        totalRemainProjects,
        netPosition: totalInvoiced - totalExpenses - totalSalariesPaid,
      },
      counts: {
        projects: projects.length,
        invoices: invoices.length,
        invoicesDone,
        invoicesUnderConstruction,
        employees: employees.length,
        fundTransactions: fundTx.length,
      },
      topCustomers,
      monthlyIncome,
      monthlySalaries,
      monthlyExpenses,
      projectsSummary,
    };
  }
}
