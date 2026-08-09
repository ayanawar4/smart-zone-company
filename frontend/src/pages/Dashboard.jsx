import { useEffect, useState } from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { api } from '../api';
import StatCard from '../components/StatCard';
import { money } from '../utils';

const COLORS = ['#2dd4bf', '#101828', '#f79009', '#6941c6', '#d92d20', '#12b76a', '#1570ef', '#dc6803'];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/dashboard/stats').then(setStats).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="error-banner">{error}</div>;
  if (!stats) return <div className="loading">جاري التحميل... / Loading...</div>;

  const { totals, counts, topCustomers, monthlyIncome, monthlyExpenses, projectsSummary } = stats;

  return (
    <div>
      <div className="page-title">لوحة التحكم · Dashboard</div>
      <div className="page-subtitle">نظرة عامة على أعمال Smart Zone / Overview of Smart Zone's business</div>

      <div className="stat-grid">
        <StatCard label="رصيد الصندوق · Fund Balance" value={money(totals.fundBalance)} tone={totals.fundBalance >= 0 ? 'positive' : 'negative'} />
        <StatCard label="إجمالي الفواتير · Total Invoiced" value={money(totals.totalInvoiced)} />
        <StatCard label="متبقي لسمارت زون · Remain to Smart Zone" value={money(totals.totalRemainSmartZone)} />
        <StatCard label="إجمالي المصاريف · Total Expenses" value={money(totals.totalExpenses)} />
        <StatCard label="إجمالي المرتبات · Total Salaries" value={money(totals.totalSalariesPaid)} />
        <StatCard label="صافي الوضع · Net Position" value={money(totals.netPosition)} tone={totals.netPosition >= 0 ? 'positive' : 'negative'} />
      </div>

      <div className="stat-grid">
        <StatCard label="عدد المشاريع · Projects" value={counts.projects} />
        <StatCard label="عدد الفواتير · Invoices" value={`${counts.invoices} (${counts.invoicesDone} منجز)`} />
        <StatCard label="عدد الموظفين · Employees" value={counts.employees} />
        <StatCard label="تكلفة المشاريع · Total Project Cost" value={money(totals.totalProjectCost)} />
      </div>

      <div className="charts-grid">
        <div className="panel">
          <h3>دخل الفواتير الشهري · Monthly Invoice Income</h3>
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
          <h3>أكبر العملاء · Top Customers</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={topCustomers} dataKey="total" nameKey="customer" outerRadius={95} label={(e) => e.customer}>
                {topCustomers.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => money(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-grid">
        <div className="panel">
          <h3>المصاريف الشهرية · Monthly Expenses</h3>
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
          <h3>أكبر المشاريع تكلفة · Projects by Cost</h3>
          <div className="table-wrap" style={{ maxHeight: 260, overflowY: 'auto' }}>
            <table>
              <thead>
                <tr><th>المشروع · Project</th><th>التكلفة · Cost</th></tr>
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
