import { useLang } from '../lang';
import CrudPage from '../components/CrudPage';

export default function Employees() {
  const { t } = useLang();
  return (
    <CrudPage
      title={t.emp_title}
      subtitle={t.emp_subtitle}
      endpoint="/employees"
      searchKeys={['name', 'role']}
      columns={[
        { key: 'name', label: t.col_name },
        { key: 'role', label: t.col_role },
        { key: 'active', label: t.col_active, render: (v) => (v ? t.active : t.inactive) },
      ]}
      formFields={[
        { key: 'name', label: t.col_name, type: 'text' },
        { key: 'role', label: t.col_role, type: 'text' },
        { key: 'active', label: t.field_active, type: 'checkbox', default: true },
      ]}
    />
  );
}
