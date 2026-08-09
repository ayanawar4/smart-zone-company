import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'لوحة التحكم', sub: 'Dashboard', end: true },
  { to: '/projects', label: 'المشاريع', sub: 'Projects' },
  { to: '/invoices', label: 'الفواتير', sub: 'Invoices' },
  { to: '/fund', label: 'الصندوق', sub: 'Fund Ledger' },
  { to: '/expenses', label: 'المصاريف', sub: 'Expenses' },
  { to: '/salaries', label: 'المرتبات', sub: 'Salaries' },
  { to: '/employees', label: 'الموظفون', sub: 'Employees' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        Smart Zone
        <small>سمارت زون لإدارة الأعمال</small>
      </div>
      <nav>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
            {l.label} <span style={{ opacity: 0.6 }}>· {l.sub}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
