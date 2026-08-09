import { useLang } from '../lang';
import CrudPage from '../components/CrudPage';
import { money } from '../utils';

export default function Expenses() {
  const { t } = useLang();
  return (
    <CrudPage
      title={t.exp_title}
      subtitle={t.exp_subtitle}
      endpoint="/expenses"
      searchKeys={['source', 'note']}
      columns={[
        { key: 'date', label: t.col_date },
        { key: 'source', label: t.col_source },
        { key: 'amount', label: t.col_amount, render: money },
        { key: 'note', label: t.col_note },
      ]}
      formFields={[
        { key: 'date', label: t.col_date, type: 'date' },
        { key: 'source', label: t.col_source, type: 'text' },
        { key: 'amount', label: t.col_amount, type: 'number' },
        { key: 'note', label: t.col_note, type: 'text' },
      ]}
    />
  );
}
