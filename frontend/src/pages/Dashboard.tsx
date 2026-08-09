import { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import StatCard from '../components/StatCard';
import { useLang } from '../lang';
import { api } from '../api';
import { money } from '../utils';

interface DashStats {
  totals: {
    fundBalance: number;
    totalInvoiced: number;
    totalRemainSmartZone: number;
    totalExpenses: number;
    totalSalariesPaid: number;
    netPosition: number;
    totalProjectCost: number;
  };
  counts: {
    projects: number;
    invoices: number;
    invoicesDone: number;
    employees: number;
  };
  topCustomers: { customer: string; total: number }[];
  monthlyIncome: { month: string; total: number }[];
  monthlyExpenses: { month: string; total: number }[];
  projectsSummary: { id: number; name: string; projectCostTotal: number }[];
}

const COLORS = ['#6366f1', '#f97316', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#ec4899'];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#0f172a',
      borderRadius: 10,
      padding: '10px 16px',
      color: '#f8fafc',
      fontSize: 13,
      fontWeight: 600,
      boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
      border: '1px solid #1e293b',
    }}>
      <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>{label}</div>
      <div style={{ color: '#f8fafc' }}>{money(payload[0].value)}</div>
    </div>
  );
}

export default function Dashboard() {
  const { t } = useLang();
  const [stats, setStats] = useState<DashStats | null>(null);

  useEffect(() => {
    api.get<DashStats>('/dashboard/stats').then(setStats);
  }, []);

  if (!stats) return <div className="page"><p>{t.loading}</p></div>;

  const { totals, counts } = stats;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>{t.dash_title}</h1>
          <p className="subtitle">{t.dash_subtitle}</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard label={t.fund_balance} value={money(totals.fundBalance)} color="#4f8ef7" />
        <StatCard label={t.total_invoiced} value={money(totals.totalInvoiced)} color="#4fc97a" />
        <StatCard label={t.remain_smart_zone} value={money(totals.totalRemainSmartZone)} color="#f7874f" />
        <StatCard label={t.total_expenses} value={money(totals.totalExpenses)} color="#f74f6e" />
        <StatCard label={t.total_salaries} value={money(totals.totalSalariesPaid)} color="#a04ff7" />
        <StatCard label={t.net_position} value={money(totals.netPosition)} color="#f7d24f" />
        <StatCard label={t.count_projects} value={counts.projects} />
        <StatCard label={t.count_invoices} value={counts.invoices} sub={`${counts.invoicesDone} ${t.count_invoices_done}`} />
        <StatCard label={t.count_employees} value={counts.employees} />
        <StatCard label={t.total_project_cost} value={money(totals.totalProjectCost)} color="#4fd6f7" />
      </div>

      <div className="charts-grid">
        {/* Monthly Income Bar Chart */}
        <div className="chart-card">
          <h3>{t.chart_monthly_income}</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stats.monthlyIncome.slice(-6)} barCategoryGap="35%" margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="incGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: string) => v.slice(5)}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                width={36}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)', radius: 6 } as object} />
              <Bar dataKey="total" fill="url(#incGradient)" radius={[6, 6, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Customers Donut */}
        <div className="chart-card">
          <h3>{t.chart_top_customers}</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart margin={{ bottom: 20 }}>
              <Pie
                data={stats.topCustomers}
                dataKey="total"
                nameKey="customer"
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
              >
                {stats.topCustomers.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => money(v)} />
              <Legend iconType="circle" iconSize={10} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Expenses Bar Chart */}
        <div className="chart-card">
          <h3>{t.chart_monthly_expenses}</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stats.monthlyExpenses.slice(-6)} barCategoryGap="35%" margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="expGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: string) => v.slice(5)}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                width={36}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(239,68,68,0.06)', radius: 6 } as object} />
              <Bar dataKey="total" fill="url(#expGradient)" radius={[6, 6, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Projects Cost Donut */}
        <div className="chart-card">
          <h3>{t.chart_projects_cost}</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart margin={{ bottom: 20 }}>
              <Pie
                data={stats.projectsSummary.slice(0, 8)}
                dataKey="projectCostTotal"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
              >
                {stats.projectsSummary.slice(0, 8).map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => money(v)} />
              <Legend iconType="circle" iconSize={10} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
