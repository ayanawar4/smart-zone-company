import CrudPage from '../components/CrudPage';
import { money } from '../utils';

export default function Salaries() {
  return (
    <CrudPage
      title="المرتبات · Salaries"
      subtitle="مرتبات الموظفين شهريًا / Monthly employee salary payments"
      endpoint="/salaries"
      searchKeys={['employeeName', 'note']}
      columns={[
        { key: 'employeeName', label: 'الموظف · Employee' },
        { key: 'month', label: 'الشهر · Month' },
        { key: 'year', label: 'السنة · Year' },
        { key: 'amount', label: 'المبلغ · Amount', render: money },
        { key: 'note', label: 'ملاحظات · Note' },
      ]}
      formFields={[
        { key: 'employeeName', label: 'الموظف · Employee', type: 'text' },
        { key: 'month', label: 'الشهر (1-12) · Month', type: 'number' },
        { key: 'year', label: 'السنة · Year', type: 'number', default: new Date().getFullYear() },
        { key: 'amount', label: 'المبلغ · Amount', type: 'number' },
        { key: 'note', label: 'ملاحظات · Note', type: 'text' },
      ]}
    />
  );
}
