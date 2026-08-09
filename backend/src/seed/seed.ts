import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import { join } from 'path';
import * as fs from 'fs';

import { Project } from '../projects/project.entity';
import { ProjectCostItem } from '../projects/project-cost-item.entity';
import { ProjectInstallItem } from '../projects/project-install-item.entity';
import { ProjectFundEntry } from '../projects/project-fund-entry.entity';
import { FundTransaction } from '../fund/fund-transaction.entity';
import { Expense } from '../expenses/expense.entity';
import { Salary } from '../salaries/salary.entity';
import { Invoice } from '../invoices/invoice.entity';
import { Employee } from '../employees/employee.entity';

const SEED_DIR = join(__dirname, '..', '..', 'seed-data');

function readJson(name: string) {
  return JSON.parse(fs.readFileSync(join(SEED_DIR, name), 'utf-8'));
}

async function run() {
  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    entities: [Project, ProjectCostItem, ProjectInstallItem, ProjectFundEntry, FundTransaction, Expense, Salary, Invoice, Employee],
    synchronize: true,
  });
  await dataSource.initialize();
  console.log('Connected to Neon Postgres. Clearing existing data...');

  await dataSource.getRepository(ProjectCostItem).clear();
  await dataSource.getRepository(ProjectInstallItem).clear();
  await dataSource.getRepository(ProjectFundEntry).clear();
  await dataSource.getRepository(Project).clear();
  await dataSource.getRepository(FundTransaction).clear();
  await dataSource.getRepository(Expense).clear();
  await dataSource.getRepository(Salary).clear();
  await dataSource.getRepository(Invoice).clear();
  await dataSource.getRepository(Employee).clear();

  // ---- Projects ----
  const projects = readJson('projects.json');
  const projectRepo = dataSource.getRepository(Project);
  const costRepo = dataSource.getRepository(ProjectCostItem);
  const installRepo = dataSource.getRepository(ProjectInstallItem);
  const fundEntryRepo = dataSource.getRepository(ProjectFundEntry);

  for (const p of projects) {
    const s = p.summary || {};
    const project = await projectRepo.save(
      projectRepo.create({
        name: p.name,
        status: 'active',
        projectCostTotal: s.projectCostTotal || 0,
        installationTotal: s.installationTotal || 0,
        totalPayed: s.totalPayed || 0,
        fund: s.fund || 0,
        hesham: s.hesham || 0,
        sayed: s.sayed || 0,
        projectAmount: s.projectAmount || 0,
        remain: s.remain || 0,
      }),
    );
    for (const ci of p.costItems || []) {
      await costRepo.save(costRepo.create({ ...ci, projectId: project.id }));
    }
    for (const ii of p.installItems || []) {
      await installRepo.save(installRepo.create({ ...ii, projectId: project.id }));
    }
    for (const amount of p.fundHistory || []) {
      await fundEntryRepo.save(fundEntryRepo.create({ amount, projectId: project.id }));
    }
  }
  console.log(`Seeded ${projects.length} projects.`);

  // ---- Fund transactions ----
  const fundTx = readJson('fund_transactions.json');
  const fundRepo = dataSource.getRepository(FundTransaction);
  for (const t of fundTx) {
    await fundRepo.save(fundRepo.create(t));
  }
  console.log(`Seeded ${fundTx.length} fund transactions.`);

  // ---- Expenses ----
  const expenses = readJson('expenses.json');
  const expenseRepo = dataSource.getRepository(Expense);
  for (const e of expenses) {
    await expenseRepo.save(expenseRepo.create(e));
  }
  console.log(`Seeded ${expenses.length} expenses.`);

  // ---- Salaries ----
  const salaries = readJson('salaries.json');
  const salaryRepo = dataSource.getRepository(Salary);
  for (const s of salaries) {
    await salaryRepo.save(salaryRepo.create(s));
  }
  console.log(`Seeded ${salaries.length} salary records.`);

  // ---- Invoices ----
  const invoices = readJson('invoices.json');
  const invoiceRepo = dataSource.getRepository(Invoice);
  for (const i of invoices) {
    await invoiceRepo.save(invoiceRepo.create(i));
  }
  console.log(`Seeded ${invoices.length} invoices.`);

  // ---- Employees ----
  const employees = readJson('employees.json');
  const employeeRepo = dataSource.getRepository(Employee);
  for (const e of employees) {
    await employeeRepo.save(employeeRepo.create(e));
  }
  console.log(`Seeded ${employees.length} employees.`);

  await dataSource.destroy();
  console.log('Seed complete.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
