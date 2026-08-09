import CrudPage from '../components/CrudPage';
import { money } from '../utils';

export default function Expenses() {
  return (
    <CrudPage
      title="المصاريف · Expenses"
      subtitle="سجل مصاريف المكتب والتشغيل / Office & operating expenses ledger"
      endpoint="/expenses"
      searchKeys={['source', 'note']}
      columns={[
        { key: 'date', label: 'التاريخ · Date' },
        { key: 'source', label: 'المصدر · Source' },
        { key: 'amount', label: 'المبلغ · Amount', render: money },
        { key: 'note', label: 'ملاحظات · Note' },
      ]}
      formFields={[
        { key: 'date', label: 'التاريخ · Date', type: 'date' },
        { key: 'source', label: 'المصدر · Source', type: 'text' },
        { key: 'amount', label: 'المبلغ · Amount', type: 'number' },
        { key: 'note', label: 'ملاحظات · Note', type: 'text' },
      ]}
    />
  );
}
