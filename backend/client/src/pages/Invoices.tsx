import CrudPage from '../components/CrudPage';
import { useLang } from '../lang';

interface Invoice {
  id: number;
  invoiceNo: number;
  date: string;
  customer: string;
  project: string;
  subtotal: number;
  vat: number;
  total: number;
  statusDone: boolean;
  statusUnderConstruction: boolean;
  commission3pct: number;
  commission1pct: number;
  remainSmartZone: number;
  remainCustomer: number;
  deposit: number;
}

export default function Invoices() {
  const { t } = useLang();

  return (
    <CrudPage<Invoice>
      title={t.inv_title}
      subtitle={t.inv_subtitle}
      endpoint="/invoices"
      searchKeys={['customer', 'project']}
      moneyKeys={['subtotal', 'vat', 'total', 'remainSmartZone', 'remainCustomer', 'deposit']}
      columns={[
        { key: 'invoiceNo', label: t.col_inv_no },
        { key: 'date', label: t.col_date },
        { key: 'customer', label: t.col_customer },
        { key: 'project', label: t.col_project_party },
        { key: 'subtotal', label: t.col_subtotal },
        { key: 'vat', label: t.col_vat },
        { key: 'total', label: t.col_inv_total },
        { key: 'remainSmartZone', label: t.col_remain_sz },
        {
          key: 'statusDone',
          label: t.col_inv_status,
          render: (_, row) => row.statusDone ? t.status_done : row.statusUnderConstruction ? t.status_inprogress : '-',
        },
      ]}
      fields={[
        { key: 'invoiceNo', label: t.col_inv_no, type: 'number' },
        { key: 'date', label: t.col_date, type: 'date' },
        { key: 'customer', label: t.col_customer },
        { key: 'project', label: t.col_project_party },
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
      defaultForm={{
        invoiceNo: 0, date: '', customer: '', project: '', deposit: 0,
        subtotal: 0, vat: 0, total: 0, statusDone: false, statusUnderConstruction: false,
        commission3pct: 0, commission1pct: 0, remainSmartZone: 0, remainCustomer: 0,
      }}
    />
  );
}
