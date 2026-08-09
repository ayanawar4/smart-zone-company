import { useLang } from '../lang';
import CrudPage from '../components/CrudPage';
import { money } from '../utils';

export default function Invoices() {
  const { t } = useLang();
  return (
    <CrudPage
      title={t.inv_title}
      subtitle={t.inv_subtitle}
      endpoint="/invoices"
      searchKeys={['customer', 'project', 'invoiceNo']}
      columns={[
        { key: 'date', label: t.col_date },
        { key: 'invoiceNo', label: t.col_inv_no },
        { key: 'customer', label: t.col_customer },
        { key: 'project', label: t.col_project_label },
        { key: 'subtotal', label: t.col_subtotal, render: money },
        { key: 'vat', label: t.col_vat, render: money },
        { key: 'total', label: t.col_inv_total, render: money },
        { key: 'statusDone', label: t.col_inv_status, render: (v, r) => (v ? t.status_done : r.statusUnderConstruction ? t.status_inprogress : '—') },
        { key: 'remainSmartZone', label: t.col_remain_sz, render: money },
      ]}
      formFields={[
        { key: 'date', label: t.col_date, type: 'date' },
        { key: 'invoiceNo', label: t.col_inv_no, type: 'number' },
        { key: 'customer', label: t.col_customer, type: 'text' },
        { key: 'project', label: t.col_project_label, type: 'text' },
        { key: 'deposit', label: t.field_deposit, type: 'number' },
        { key: 'subtotal', label: t.col_subtotal, type: 'number' },
        { key: 'vat', label: t.col_vat, type: 'number' },
        { key: 'total', label: t.col_inv_total, type: 'number' },
        { key: 'statusDone', label: t.field_done, type: 'checkbox' },
        { key: 'statusUnderConstruction', label: t.field_inprogress, type: 'checkbox' },
        { key: 'commission3pct', label: t.field_commission3, type: 'number' },
        { key: 'commission1pct', label: t.field_commission1, type: 'number' },
        { key: 'remainSmartZone', label: t.field_remain_sz, type: 'number' },
        { key: 'remainCustomer', label: t.field_remain_customer, type: 'number' },
      ]}
    />
  );
}
