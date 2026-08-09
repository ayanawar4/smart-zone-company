import CrudPage from '../components/CrudPage';
import { useLang } from '../lang';

interface Employee {
  id: number;
  name: string;
  role: string;
  active: boolean;
  notes: string;
}

export default function Employees() {
  const { t } = useLang();

  return (
    <CrudPage<Employee>
      title={t.emp_title}
      subtitle={t.emp_subtitle}
      endpoint="/employees"
      searchKeys={['name', 'role']}
      columns={[
        { key: 'name', label: t.col_name },
        { key: 'role', label: t.col_role },
        { key: 'active', label: t.col_active, render: (v) => v ? t.active : t.inactive },
        { key: 'notes', label: t.col_note },
      ]}
      fields={[
        { key: 'name', label: t.col_name },
        { key: 'role', label: t.col_role },
        { key: 'active', label: t.field_active, type: 'checkbox' },
        { key: 'notes', label: t.col_note },
      ]}
      defaultForm={{ name: '', role: '', active: true, notes: '' }}
    />
  );
}
