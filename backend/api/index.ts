import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { Project } from '../src/projects/project.entity';
import { ProjectCostItem } from '../src/projects/project-cost-item.entity';
import { ProjectInstallItem } from '../src/projects/project-install-item.entity';
import { ProjectFundEntry } from '../src/projects/project-fund-entry.entity';
import { FundTransaction } from '../src/fund/fund-transaction.entity';
import { Expense } from '../src/expenses/expense.entity';
import { Salary } from '../src/salaries/salary.entity';
import { Invoice } from '../src/invoices/invoice.entity';
import { Employee } from '../src/employees/employee.entity';

const app = express();
app.use(express.json());

let ds: DataSource;
async function getDS() {
  if (ds?.isInitialized) return ds;
  ds = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    entities: [Project, ProjectCostItem, ProjectInstallItem, ProjectFundEntry,
      FundTransaction, Expense, Salary, Invoice, Employee],
    synchronize: false,
  });
  await ds.initialize();
  return ds;
}

// ── helper ──────────────────────────────────────────────────
const wrap = (fn: (req: express.Request, res: express.Response) => Promise<void>) =>
  async (req: express.Request, res: express.Response) => {
    try { await fn(req, res); }
    catch (e: any) { res.status(500).json({ message: e.message }); }
  };

// ── Projects ─────────────────────────────────────────────────
app.get('/api/projects', wrap(async (_, res) => {
  const db = await getDS();
  res.json(await db.getRepository(Project).find({ order: { id: 'ASC' } }));
}));

app.get('/api/projects/:id', wrap(async (req, res) => {
  const db = await getDS();
  const p = await db.getRepository(Project).findOne({
    where: { id: +req.params.id },
    relations: ['costItems', 'installItems', 'fundEntries'],
  });
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
}));

app.post('/api/projects', wrap(async (req, res) => {
  const db = await getDS();
  const repo = db.getRepository(Project);
  res.status(201).json(await repo.save(repo.create(req.body)));
}));

app.patch('/api/projects/:id', wrap(async (req, res) => {
  const db = await getDS();
  const repo = db.getRepository(Project);
  await repo.update(+req.params.id, req.body);
  res.json(await repo.findOneBy({ id: +req.params.id }));
}));

app.delete('/api/projects/:id', wrap(async (req, res) => {
  const db = await getDS();
  await db.getRepository(Project).delete(+req.params.id);
  res.status(204).end();
}));

app.post('/api/projects/:id/cost-items', wrap(async (req, res) => {
  const db = await getDS();
  const repo = db.getRepository(ProjectCostItem);
  res.status(201).json(await repo.save(repo.create({ ...req.body, projectId: +req.params.id })));
}));

app.delete('/api/projects/:id/cost-items/:itemId', wrap(async (req, res) => {
  const db = await getDS();
  await db.getRepository(ProjectCostItem).delete(+req.params.itemId);
  res.status(204).end();
}));

app.post('/api/projects/:id/install-items', wrap(async (req, res) => {
  const db = await getDS();
  const repo = db.getRepository(ProjectInstallItem);
  res.status(201).json(await repo.save(repo.create({ ...req.body, projectId: +req.params.id })));
}));

app.delete('/api/projects/:id/install-items/:itemId', wrap(async (req, res) => {
  const db = await getDS();
  await db.getRepository(ProjectInstallItem).delete(+req.params.itemId);
  res.status(204).end();
}));

// ── Fund ─────────────────────────────────────────────────────
app.get('/api/fund', wrap(async (_, res) => {
  const db = await getDS();
  res.json(await db.getRepository(FundTransaction).find({ order: { id: 'ASC' } }));
}));

app.post('/api/fund', wrap(async (req, res) => {
  const db = await getDS();
  const repo = db.getRepository(FundTransaction);
  res.status(201).json(await repo.save(repo.create(req.body)));
}));

app.patch('/api/fund/:id', wrap(async (req, res) => {
  const db = await getDS();
  const repo = db.getRepository(FundTransaction);
  await repo.update(+req.params.id, req.body);
  res.json(await repo.findOneBy({ id: +req.params.id }));
}));

app.delete('/api/fund/:id', wrap(async (req, res) => {
  const db = await getDS();
  await db.getRepository(FundTransaction).delete(+req.params.id);
  res.status(204).end();
}));

// ── Expenses ──────────────────────────────────────────────────
app.get('/api/expenses', wrap(async (_, res) => {
  const db = await getDS();
  res.json(await db.getRepository(Expense).find({ order: { id: 'ASC' } }));
}));

app.post('/api/expenses', wrap(async (req, res) => {
  const db = await getDS();
  const repo = db.getRepository(Expense);
  res.status(201).json(await repo.save(repo.create(req.body)));
}));

app.patch('/api/expenses/:id', wrap(async (req, res) => {
  const db = await getDS();
  const repo = db.getRepository(Expense);
  await repo.update(+req.params.id, req.body);
  res.json(await repo.findOneBy({ id: +req.params.id }));
}));

app.delete('/api/expenses/:id', wrap(async (req, res) => {
  const db = await getDS();
  await db.getRepository(Expense).delete(+req.params.id);
  res.status(204).end();
}));

// ── Salaries ──────────────────────────────────────────────────
app.get('/api/salaries', wrap(async (_, res) => {
  const db = await getDS();
  res.json(await db.getRepository(Salary).find({ order: { id: 'ASC' } }));
}));

app.post('/api/salaries', wrap(async (req, res) => {
  const db = await getDS();
  const repo = db.getRepository(Salary);
  res.status(201).json(await repo.save(repo.create(req.body)));
}));

app.patch('/api/salaries/:id', wrap(async (req, res) => {
  const db = await getDS();
  const repo = db.getRepository(Salary);
  await repo.update(+req.params.id, req.body);
  res.json(await repo.findOneBy({ id: +req.params.id }));
}));

app.delete('/api/salaries/:id', wrap(async (req, res) => {
  const db = await getDS();
  await db.getRepository(Salary).delete(+req.params.id);
  res.status(204).end();
}));

// ── Invoices ──────────────────────────────────────────────────
app.get('/api/invoices', wrap(async (_, res) => {
  const db = await getDS();
  res.json(await db.getRepository(Invoice).find({ order: { id: 'ASC' } }));
}));

app.post('/api/invoices', wrap(async (req, res) => {
  const db = await getDS();
  const repo = db.getRepository(Invoice);
  res.status(201).json(await repo.save(repo.create(req.body)));
}));

app.patch('/api/invoices/:id', wrap(async (req, res) => {
  const db = await getDS();
  const repo = db.getRepository(Invoice);
  await repo.update(+req.params.id, req.body);
  res.json(await repo.findOneBy({ id: +req.params.id }));
}));

app.delete('/api/invoices/:id', wrap(async (req, res) => {
  const db = await getDS();
  await db.getRepository(Invoice).delete(+req.params.id);
  res.status(204).end();
}));

// ── Employees ─────────────────────────────────────────────────
app.get('/api/employees', wrap(async (_, res) => {
  const db = await getDS();
  res.json(await db.getRepository(Employee).find({ order: { id: 'ASC' } }));
}));

app.post('/api/employees', wrap(async (req, res) => {
  const db = await getDS();
  const repo = db.getRepository(Employee);
  res.status(201).json(await repo.save(repo.create(req.body)));
}));

app.patch('/api/employees/:id', wrap(async (req, res) => {
  const db = await getDS();
  const repo = db.getRepository(Employee);
  await repo.update(+req.params.id, req.body);
  res.json(await repo.findOneBy({ id: +req.params.id }));
}));

app.delete('/api/employees/:id', wrap(async (req, res) => {
  const db = await getDS();
  await db.getRepository(Employee).delete(+req.params.id);
  res.status(204).end();
}));

// ── Dashboard ─────────────────────────────────────────────────
app.get('/api/dashboard/stats', wrap(async (_, res) => {
  const db = await getDS();
  const [projects, fundTx, expenses, salaries, invoices, employees] = await Promise.all([
    db.getRepository(Project).find(),
    db.getRepository(FundTransaction).find({ order: { id: 'ASC' } }),
    db.getRepository(Expense).find(),
    db.getRepository(Salary).find(),
    db.getRepository(Invoice).find(),
    db.getRepository(Employee).find(),
  ]);

  const fundBalance = fundTx.length ? fundTx[fundTx.length - 1].balanceAfter : 0;
  const totalExpenses = expenses.reduce((s, e) => s + (e.amount || 0), 0);
  const totalSalariesPaid = salaries.reduce((s, s2) => s + (s2.amount || 0), 0);
  const totalInvoiced = invoices.reduce((s, i) => s + (i.total || 0), 0);
  const totalRemainSmartZone = invoices.reduce((s, i) => s + (i.remainSmartZone || 0), 0);
  const totalProjectCost = projects.reduce((s, p) => s + (p.projectCostTotal || 0), 0);
  const totalInstallation = projects.reduce((s, p) => s + (p.installationTotal || 0), 0);

  const byCustomer: Record<string, number> = {};
  for (const inv of invoices) {
    const c = inv.customer || 'Unknown';
    byCustomer[c] = (byCustomer[c] || 0) + (inv.total || 0);
  }
  const topCustomers = Object.entries(byCustomer)
    .map(([customer, total]) => ({ customer, total }))
    .sort((a, b) => b.total - a.total).slice(0, 8);

  const monthly: Record<string, number> = {};
  for (const inv of invoices) {
    if (!inv.date) continue;
    const key = String(inv.date).slice(0, 7);
    monthly[key] = (monthly[key] || 0) + (inv.total || 0);
  }
  const monthlyIncome = Object.entries(monthly)
    .map(([month, total]) => ({ month, total }))
    .sort((a, b) => a.month.localeCompare(b.month));

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
    .map(p => ({ id: p.id, name: p.name, projectCostTotal: p.projectCostTotal, installationTotal: p.installationTotal, totalPayed: p.totalPayed, remain: p.remain, status: p.status }))
    .sort((a, b) => b.projectCostTotal - a.projectCostTotal);

  res.json({
    totals: {
      fundBalance, totalFundIn: fundTx.reduce((s, t) => s + (t.amountIn || 0), 0),
      totalFundOut: fundTx.reduce((s, t) => s + (t.amountOut || 0), 0),
      totalExpenses, totalSalariesPaid, totalInvoiced, totalRemainSmartZone,
      totalProjectCost, totalInstallation,
      totalRemainProjects: projects.reduce((s, p) => s + (p.remain || 0), 0),
      netPosition: totalInvoiced - totalExpenses - totalSalariesPaid,
    },
    counts: {
      projects: projects.length, invoices: invoices.length,
      invoicesDone: invoices.filter(i => i.statusDone).length,
      invoicesUnderConstruction: invoices.filter(i => i.statusUnderConstruction).length,
      employees: employees.length, fundTransactions: fundTx.length,
    },
    topCustomers, monthlyIncome, monthlyExpenses, projectsSummary,
  });
}));

export default app;
