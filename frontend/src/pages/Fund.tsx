import CrudPage from '../components/CrudPage';
import { useLang } from '../lang';

interface FundTransaction {
  id: number;
  no: number;
  date: string;
  project: string;
  item: string;
  category: string;
  amountIn: number;
  amountOut: number;
  balanceAfter: number;
  note: string;
}

export default function Fund() {
  const { t } = useLang();

  return (
    <CrudPage<FundTransaction>
      title={t.fund_title}
      subtitle={t.fund_subtitle}
      endpoint="/fund"
      searchKeys={['project', 'item', 'category']}
      moneyKeys={['amountIn', 'amountOut', 'balanceAfter']}
      columns={[
        { key: 'date', label: t.col_date },
        { key: 'project', label: t.col_project_party },
        { key: 'item', label: t.col_item_field },
        { key: 'category', label: t.col_category },
        { key: 'amountIn', label: t.col_in },
        { key: 'amountOut', label: t.col_out },
        { key: 'balanceAfter', label: t.col_balance },
        { key: 'note', label: t.col_note },
      ]}
      fields={[
        { key: 'date', label: t.col_date, type: 'date' },
        { key: 'project', label: t.col_project_party },
        { key: 'item', label: t.col_item_field },
        { key: 'category', label: t.col_category },
        { key: 'amountIn', label: t.col_in, type: 'number' },
        { key: 'amountOut', label: t.col_out, type: 'number' },
        { key: 'balanceAfter', label: t.col_balance, type: 'number' },
        { key: 'note', label: t.col_note },
      ]}
      defaultForm={{ date: '', project: '', item: '', category: '', amountIn: 0, amountOut: 0, balanceAfter: 0, note: '' }}
    />
  );
}
