import CrudPage from '../components/CrudPage';
import { useLang } from '../lang';

interface Expense {
  id: number;
  source: string;
  amount: number;
  date: string;
  note: string;
}

export default function Expenses() {
  const { t } = useLang();

  return (
    <CrudPage<Expense>
      title={t.exp_title}
      subtitle={t.exp_subtitle}
      endpoint="/expenses"
      searchKeys={['source', 'note']}
      moneyKeys={['amount']}
      columns={[
        { key: 'date', label: t.col_date },
        { key: 'source', label: t.col_source },
        { key: 'amount', label: t.col_amount },
        { key: 'note', label: t.col_note },
      ]}
      fields={[
        { key: 'date', label: t.col_date, type: 'date' },
        { key: 'source', label: t.col_source },
        { key: 'amount', label: t.col_amount, type: 'number' },
        { key: 'note', label: t.col_note },
      ]}
      defaultForm={{ source: '', amount: 0, date: '', note: '' }}
    />
  );
}
