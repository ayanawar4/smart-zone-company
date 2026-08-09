import { useLang } from '../lang';
import CrudPage from '../components/CrudPage';
import { money } from '../utils';

export default function Salaries() {
  const { t } = useLang();
  return (
    <CrudPage
      title={t.sal_title}
      subtitle={t.sal_subtitle}
      endpoint="/salaries"
      searchKeys={['employeeName', 'note']}
      columns={[
        { key: 'employeeName', label: t.col_employee },
        { key: 'month', label: t.col_month },
        { key: 'year', label: t.col_year },
        { key: 'amount', label: t.col_amount, render: money },
        { key: 'note', label: t.col_note },
      ]}
      formFields={[
        { key: 'employeeName', label: t.col_employee, type: 'text' },
        { key: 'month', label: t.field_month, type: 'number' },
        { key: 'year', label: t.col_year, type: 'number', default: new Date().getFullYear() },
        { key: 'amount', label: t.col_amount, type: 'number' },
        { key: 'note', label: t.col_note, type: 'text' },
      ]}
    />
  );
}
