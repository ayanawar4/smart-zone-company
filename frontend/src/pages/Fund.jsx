import { useEffect, useState } from 'react';
import { api } from '../api';
import { money } from '../utils';
import CrudPage from '../components/CrudPage';

export default function Fund() {
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    api.get('/fund/balance').then((r) => setBalance(r.balance)).catch(() => {});
  }, []);

  return (
    <div>
      {balance !== null && (
        <div className="stat-grid" style={{ marginBottom: 8 }}>
          <div className="stat-card">
            <div className="label">الرصيد الحالي للصندوق · Current Fund Balance</div>
            <div className={`value ${balance >= 0 ? 'positive' : 'negative'}`}>{money(balance)}</div>
          </div>
        </div>
      )}
      <CrudPage
        title="سجل الصندوق · Fund Ledger"
        subtitle="جميع حركات الإيداع والسحب من الصندوق الرئيسي / All in/out movements of the main fund"
        endpoint="/fund"
        searchKeys={['project', 'item', 'category', 'note']}
        columns={[
          { key: 'date', label: 'التاريخ · Date' },
          { key: 'project', label: 'المشروع/الجهة · Project/Party' },
          { key: 'item', label: 'البند · Item' },
          { key: 'category', label: 'التصنيف · Category' },
          { key: 'amountIn', label: 'وارد · In', render: money },
          { key: 'amountOut', label: 'صادر · Out', render: money },
          { key: 'balanceAfter', label: 'الرصيد · Balance', render: money },
        ]}
        formFields={[
          { key: 'date', label: 'التاريخ · Date', type: 'date' },
          { key: 'project', label: 'المشروع/الجهة · Project/Party', type: 'text' },
          { key: 'item', label: 'البند · Item', type: 'text' },
          { key: 'category', label: 'التصنيف · Category', type: 'text' },
          { key: 'amountIn', label: 'وارد · In', type: 'number' },
          { key: 'amountOut', label: 'صادر · Out', type: 'number' },
          { key: 'note', label: 'ملاحظات · Note', type: 'text' },
        ]}
      />
    </div>
  );
}
