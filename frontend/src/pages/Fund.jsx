import { useEffect, useState } from 'react';
import { api } from '../api';
import { useLang } from '../lang';
import { money } from '../utils';
import CrudPage from '../components/CrudPage';

export default function Fund() {
  const { t } = useLang();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    api.get('/fund/balance').then((r) => setBalance(r.balance)).catch(() => {});
  }, []);

  return (
    <div>
      {balance !== null && (
        <div className="stat-grid" style={{ marginBottom: 8 }}>
          <div className="stat-card">
            <div className="label">{t.current_balance}</div>
            <div className={`value ${balance >= 0 ? 'positive' : 'negative'}`}>{money(balance)}</div>
          </div>
        </div>
      )}
      <CrudPage
        title={t.fund_title}
        subtitle={t.fund_subtitle}
        endpoint="/fund"
        searchKeys={['project', 'item', 'category', 'note']}
        columns={[
          { key: 'date', label: t.col_date },
          { key: 'project', label: t.col_project_party },
          { key: 'item', label: t.col_item_field },
          { key: 'category', label: t.col_category },
          { key: 'amountIn', label: t.col_in, render: money },
          { key: 'amountOut', label: t.col_out, render: money },
          { key: 'balanceAfter', label: t.col_balance, render: money },
        ]}
        formFields={[
          { key: 'date', label: t.col_date, type: 'date' },
          { key: 'project', label: t.col_project_party, type: 'text' },
          { key: 'item', label: t.col_item_field, type: 'text' },
          { key: 'category', label: t.col_category, type: 'text' },
          { key: 'amountIn', label: t.col_in, type: 'number' },
          { key: 'amountOut', label: t.col_out, type: 'number' },
          { key: 'note', label: t.col_note, type: 'text' },
        ]}
      />
    </div>
  );
}
