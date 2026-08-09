import { NavLink } from 'react-router-dom';
import { useLang } from '../lang';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { t, toggle } = useLang();

  const links = [
    { to: '/', label: t.nav_dashboard },
    { to: '/projects', label: t.nav_projects },
    { to: '/invoices', label: t.nav_invoices },
    { to: '/fund', label: t.nav_fund },
    { to: '/expenses', label: t.nav_expenses },
    { to: '/salaries', label: t.nav_salaries },
    { to: '/employees', label: t.nav_employees },
  ];

  return (
    <>
      <div className={`sidebar-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-name">Smart Zone</div>
          <div className="brand-sub">{t.brand_sub}</div>
        </div>
        <nav>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={onClose}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button className="lang-toggle" onClick={toggle}>
          {t.lang_toggle}
        </button>
      </aside>
    </>
  );
}
