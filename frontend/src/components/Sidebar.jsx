import { NavLink } from 'react-router-dom';
import { useLang } from '../lang';

export default function Sidebar() {
  const { t, toggle } = useLang();

  const links = [
    { to: '/', label: t.nav_dashboard, end: true },
    { to: '/projects', label: t.nav_projects },
    { to: '/invoices', label: t.nav_invoices },
    { to: '/fund', label: t.nav_fund },
    { to: '/expenses', label: t.nav_expenses },
    { to: '/salaries', label: t.nav_salaries },
    { to: '/employees', label: t.nav_employees },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        Smart Zone
        <small>{t.brand_sub}</small>
      </div>
      <nav>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
            {l.label}
          </NavLink>
        ))}
      </nav>
      <button className="lang-toggle" onClick={toggle}>{t.lang_toggle}</button>
    </aside>
  );
}
