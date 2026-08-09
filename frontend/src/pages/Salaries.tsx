import CrudPage from '../components/CrudPage';
import { useLang } from '../lang';

interface Salary {
  id: number;
  employeeName: string;
  month: number;
  year: number;
  amount: number;
  note: string;
}

export default function Salaries() {
  const { t } = useLang();

  return (
    <CrudPage<Salary>
      title={t.sal_title}
      subtitle={t.sal_subtitle}
      endpoint="/salaries"
      searchKeys={['employeeName']}
      moneyKeys={['amount']}
      columns={[
        { key: 'employeeName', label: t.col_employee },
        { key: 'month', label: t.col_month },
        { key: 'year', label: t.col_year },
        { key: 'amount', label: t.col_amount },
        { key: 'note', label: t.col_note },
      ]}
      fields={[
        { key: 'employeeName', label: t.col_employee },
        { key: 'month', label: t.field_month, type: 'number' },
        { key: 'year', label: t.col_year, type: 'number' },
        { key: 'amount', label: t.col_amount, type: 'number' },
        { key: 'note', label: t.col_note },
      ]}
      defaultForm={{ employeeName: '', month: 1, year: new Date().getFullYear(), amount: 0, note: '' }}
    />
  );
}
