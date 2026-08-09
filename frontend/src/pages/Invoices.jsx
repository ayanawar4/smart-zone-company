import CrudPage from '../components/CrudPage';
import { money } from '../utils';

export default function Invoices() {
  return (
    <CrudPage
      title="الفواتير · Invoices"
      subtitle="فواتير العملاء وحالة السداد / Client invoices & payment status"
      endpoint="/invoices"
      searchKeys={['customer', 'project', 'invoiceNo']}
      columns={[
        { key: 'date', label: 'التاريخ · Date' },
        { key: 'invoiceNo', label: 'رقم الفاتورة · No.' },
        { key: 'customer', label: 'العميل · Customer' },
        { key: 'project', label: 'المشروع · Project' },
        { key: 'subtotal', label: 'قبل الضريبة · Subtotal', render: money },
        { key: 'vat', label: 'الضريبة · VAT', render: money },
        { key: 'total', label: 'الإجمالي · Total', render: money },
        { key: 'statusDone', label: 'الحالة · Status', render: (v, r) => (v ? 'منجز · Done' : r.statusUnderConstruction ? 'قيد التنفيذ · In progress' : '—') },
        { key: 'remainSmartZone', label: 'متبقي لسمارت زون · Remain', render: money },
      ]}
      formFields={[
        { key: 'date', label: 'التاريخ · Date', type: 'date' },
        { key: 'invoiceNo', label: 'رقم الفاتورة · No.', type: 'number' },
        { key: 'customer', label: 'العميل · Customer', type: 'text' },
        { key: 'project', label: 'المشروع · Project', type: 'text' },
        { key: 'subtotal', label: 'قبل الضريبة · Subtotal', type: 'number' },
        { key: 'vat', label: 'الضريبة · VAT', type: 'number' },
        { key: 'total', label: 'الإجمالي · Total', type: 'number' },
        { key: 'statusDone', label: 'منجز؟ · Done', type: 'checkbox' },
        { key: 'statusUnderConstruction', label: 'قيد التنفيذ؟ · In progress', type: 'checkbox' },
        { key: 'commission3pct', label: 'عمولة 3% · Commission 3%', type: 'number' },
        { key: 'commission1pct', label: 'عمولة 1% · Commission 1%', type: 'number' },
        { key: 'remainSmartZone', label: 'متبقي لسمارت زون · Remain (Smart Zone)', type: 'number' },
        { key: 'remainCustomer', label: 'متبقي على العميل · Remain (Customer)', type: 'number' },
      ]}
    />
  );
}
