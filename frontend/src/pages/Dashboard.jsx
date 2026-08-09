import { useEffect, useState } from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { api } from '../api';
import { useLang } from '../lang';
import StatCard from '../components/StatCard';
import { money } from '../utils';

const COLORS = ['#2dd4bf', '#101828', '#f79009', '#6941c6', '#d92d20', '#12b76a', '#1570ef', '#dc6803'];

export default function Dashboard() {
  const { t } = useLang();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/dashboard/stats').then(setStats).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="error-banner">{error}</div>;
  if (!stats) return <div className="loading">{t.loading}</div>;

  const { totals, counts, topCustomers, monthlyIncome, monthlyExpenses, projectsSummary } = stats;

  return (
    <div>
      <div className="page-title">{t.dash_title}</div>
      <div className="page-subtitle">{t.dash_subtitle}</div>

      <div className="stat-grid">
        <StatCard label={t.fund_balance} value={money(totals.fundBalance)} tone={totals.fundBalance >= 0 ? 'positive' : 'negative'} />
        <StatCard label={t.total_invoiced} value={money(totals.totalInvoiced)} />
        <StatCard label={t.remain_smart_zone} value={money(totals.totalRemainSmartZone)} />
        <StatCard label={t.total_expenses} value={money(totals.totalExpenses)} />
        <StatCard label={t.total_salaries} value={money(totals.totalSalariesPaid)} />
        <StatCard label={t.net_position} value={money(totals.netPosition)} tone={totals.netPosition >= 0 ? 'positive' : 'negative'} />
      </div>

      <div className="stat-grid">
        <StatCard label={t.count_projects} value={counts.projects} />
        <StatCard label={t.count_invoices} value={`${counts.invoices} (${counts.invoicesDone} ${t.count_invoices_done})`} />
        <StatCard label={t.count_employees} value={counts.employees} />
        <StatCard label={t.total_project_cost} value={money(totals.totalProjectCost)} />
      </div>

      <div className="charts-grid">
        <div className="panel">
          <h3>{t.chart_monthly_income}</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyIncome}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(v) => money(v)} />
              <Line type="monotone" dataKey="total" stroke="#2dd4bf" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <h3>{t.chart_top_customers}</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={topCustomers}
                dataKey="total"
                nameKey="customer"
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={3}
                stroke="none"
              >
                {topCustomers.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, name) => [money(v), name]}
                contentStyle={{ borderRadius: 8, border: '1px solid #eaecf0', fontSize: 13 }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span style={{ fontSize: 12, color: '#475467' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-grid">
        <div className="panel">
          <h3>{t.chart_monthly_expenses}</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyExpenses}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(v) => money(v)} />
              <Bar dataKey="total" fill="#f79009" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <h3>{t.chart_projects_cost}</h3>
          <div className="table-wrap" style={{ maxHeight: 260, overflowY: 'auto' }}>
            <table>
              <thead>
                <tr><th>{t.col_project_label}</th><th>{t.col_cost_label}</th></tr>
              </thead>
              <tbody>
                {projectsSummary.slice(0, 8).map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{money(p.projectCostTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
