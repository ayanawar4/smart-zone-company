import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Translations {
  dir: string;
  lang_toggle: string;
  nav_dashboard: string;
  nav_projects: string;
  nav_invoices: string;
  nav_fund: string;
  nav_expenses: string;
  nav_salaries: string;
  nav_employees: string;
  brand_sub: string;
  loading: string;
  search: string;
  add: string;
  edit: string;
  delete: string;
  save: string;
  cancel: string;
  no_records: string;
  confirm_delete: string;
  add_record: string;
  edit_record: string;
  col_date: string;
  col_note: string;
  col_amount: string;
  dash_title: string;
  dash_subtitle: string;
  fund_balance: string;
  total_invoiced: string;
  remain_smart_zone: string;
  total_expenses: string;
  total_salaries: string;
  net_position: string;
  count_projects: string;
  count_invoices: string;
  count_invoices_done: string;
  count_employees: string;
  total_project_cost: string;
  chart_monthly_income: string;
  chart_top_customers: string;
  chart_monthly_expenses: string;
  chart_projects_cost: string;
  col_project_label: string;
  col_cost_label: string;
  proj_title: string;
  proj_subtitle: string;
  search_projects: string;
  new_project: string;
  col_project: string;
  col_cost: string;
  col_installation: string;
  col_payed: string;
  col_remain: string;
  col_status: string;
  new_project_title: string;
  field_proj_name: string;
  field_client: string;
  confirm_delete_project: string;
  back_projects: string;
  proj_detail_subtitle: string;
  stat_project_cost: string;
  stat_installation: string;
  stat_total_payed: string;
  stat_remain: string;
  stat_hesham: string;
  stat_sayed: string;
  tab_cost: string;
  tab_install: string;
  add_item: string;
  no_items: string;
  col_item: string;
  col_item_name: string;
  col_unit_price: string;
  col_qty: string;
  col_total: string;
  add_cost_item: string;
  add_install_item: string;
  field_total_auto: string;
  confirm_delete_item: string;
  fund_title: string;
  fund_subtitle: string;
  current_balance: string;
  col_project_party: string;
  col_item_field: string;
  col_category: string;
  col_in: string;
  col_out: string;
  col_balance: string;
  exp_title: string;
  exp_subtitle: string;
  col_source: string;
  sal_title: string;
  sal_subtitle: string;
  col_employee: string;
  col_month: string;
  col_year: string;
  field_month: string;
  inv_title: string;
  inv_subtitle: string;
  col_inv_no: string;
  col_customer: string;
  col_subtotal: string;
  col_vat: string;
  col_inv_total: string;
  col_inv_status: string;
  col_remain_sz: string;
  status_done: string;
  status_inprogress: string;
  field_done: string;
  field_inprogress: string;
  field_commission3: string;
  field_commission1: string;
  field_remain_sz: string;
  field_remain_customer: string;
  field_deposit: string;
  emp_title: string;
  emp_subtitle: string;
  col_name: string;
  col_role: string;
  col_active: string;
  active: string;
  inactive: string;
  field_active: string;
}

const ar: Translations = {
  dir: 'rtl', lang_toggle: 'English',
  nav_dashboard: 'لوحة التحكم', nav_projects: 'المشاريع', nav_invoices: 'الفواتير',
  nav_fund: 'الصندوق', nav_expenses: 'المصاريف', nav_salaries: 'المرتبات',
  nav_employees: 'الموظفون', brand_sub: 'سمارت زون لإدارة الأعمال',
  loading: 'جاري التحميل...', search: 'بحث...', add: '+ إضافة', edit: 'تعديل',
  delete: 'حذف', save: 'حفظ', cancel: 'إلغاء', no_records: 'لا توجد بيانات',
  confirm_delete: 'هل تريد حذف هذا السجل؟', add_record: 'إضافة سجل', edit_record: 'تعديل السجل',
  col_date: 'التاريخ', col_note: 'ملاحظات', col_amount: 'المبلغ',
  dash_title: 'لوحة التحكم', dash_subtitle: 'نظرة عامة على أعمال Smart Zone',
  fund_balance: 'رصيد الصندوق', total_invoiced: 'إجمالي الفواتير',
  remain_smart_zone: 'متبقي لسمارت زون', total_expenses: 'إجمالي المصاريف',
  total_salaries: 'إجمالي المرتبات', net_position: 'صافي الوضع',
  count_projects: 'عدد المشاريع', count_invoices: 'عدد الفواتير', count_invoices_done: 'منجز',
  count_employees: 'عدد الموظفين', total_project_cost: 'تكلفة المشاريع',
  chart_monthly_income: 'دخل الفواتير الشهري', chart_top_customers: 'أكبر العملاء',
  chart_monthly_expenses: 'المصاريف الشهرية', chart_projects_cost: 'أكبر المشاريع تكلفة',
  col_project_label: 'المشروع', col_cost_label: 'التكلفة',
  proj_title: 'المشاريع', proj_subtitle: 'تكلفة كل مشروع، التركيب، والتمويل',
  search_projects: 'بحث عن مشروع...', new_project: '+ مشروع جديد',
  col_project: 'المشروع', col_cost: 'تكلفة المشروع', col_installation: 'التركيب',
  col_payed: 'المدفوع', col_remain: 'المتبقي', col_status: 'الحالة',
  new_project_title: 'مشروع جديد', field_proj_name: 'اسم المشروع', field_client: 'العميل',
  confirm_delete_project: 'هل تريد حذف هذا المشروع؟',
  back_projects: '‹ رجوع للمشاريع', proj_detail_subtitle: 'تفاصيل تكلفة المشروع والتركيب والتمويل',
  stat_project_cost: 'تكلفة المشروع', stat_installation: 'التركيب',
  stat_total_payed: 'المدفوع', stat_remain: 'المتبقي',
  stat_hesham: 'تمويل هشام', stat_sayed: 'تمويل سيد',
  tab_cost: 'بنود التكلفة', tab_install: 'بنود التركيب', add_item: '+ إضافة بند',
  no_items: 'لا توجد بنود', col_item: 'الصنف', col_item_name: 'الاسم',
  col_unit_price: 'سعر الوحدة', col_qty: 'الكمية', col_total: 'الإجمالي',
  add_cost_item: 'إضافة بند تكلفة', add_install_item: 'إضافة بند تركيب',
  field_total_auto: 'الإجمالي (يُحسب تلقائياً)', confirm_delete_item: 'حذف هذا البند؟',
  fund_title: 'سجل الصندوق', fund_subtitle: 'جميع حركات الإيداع والسحب من الصندوق الرئيسي',
  current_balance: 'الرصيد الحالي للصندوق', col_project_party: 'المشروع/الجهة',
  col_item_field: 'البند', col_category: 'التصنيف', col_in: 'وارد', col_out: 'صادر', col_balance: 'الرصيد',
  exp_title: 'المصاريف', exp_subtitle: 'سجل مصاريف المكتب والتشغيل', col_source: 'المصدر',
  sal_title: 'المرتبات', sal_subtitle: 'مرتبات الموظفين شهريًا',
  col_employee: 'الموظف', col_month: 'الشهر', col_year: 'السنة', field_month: 'الشهر (1-12)',
  inv_title: 'الفواتير', inv_subtitle: 'فواتير العملاء وحالة السداد',
  col_inv_no: 'رقم الفاتورة', col_customer: 'العميل', col_subtotal: 'قبل الضريبة',
  col_vat: 'الضريبة', col_inv_total: 'الإجمالي', col_inv_status: 'الحالة',
  col_remain_sz: 'متبقي لسمارت زون', status_done: 'منجز', status_inprogress: 'قيد التنفيذ',
  field_done: 'منجز؟', field_inprogress: 'قيد التنفيذ؟',
  field_commission3: 'عمولة 3%', field_commission1: 'عمولة 1%',
  field_remain_sz: 'متبقي لسمارت زون', field_remain_customer: 'متبقي على العميل', field_deposit: 'العربون',
  emp_title: 'الموظفون', emp_subtitle: 'قائمة الموظفين والفريق',
  col_name: 'الاسم', col_role: 'الوظيفة', col_active: 'الحالة',
  active: 'نشط', inactive: 'غير نشط', field_active: 'نشط؟',
};

const en: Translations = {
  dir: 'ltr', lang_toggle: 'العربية',
  nav_dashboard: 'Dashboard', nav_projects: 'Projects', nav_invoices: 'Invoices',
  nav_fund: 'Fund Ledger', nav_expenses: 'Expenses', nav_salaries: 'Salaries',
  nav_employees: 'Employees', brand_sub: 'Smart Zone Business Management',
  loading: 'Loading...', search: 'Search...', add: '+ Add', edit: 'Edit',
  delete: 'Delete', save: 'Save', cancel: 'Cancel', no_records: 'No records',
  confirm_delete: 'Delete this record?', add_record: 'Add Record', edit_record: 'Edit Record',
  col_date: 'Date', col_note: 'Note', col_amount: 'Amount',
  dash_title: 'Dashboard', dash_subtitle: "Overview of Smart Zone's business",
  fund_balance: 'Fund Balance', total_invoiced: 'Total Invoiced',
  remain_smart_zone: 'Remain to Smart Zone', total_expenses: 'Total Expenses',
  total_salaries: 'Total Salaries', net_position: 'Net Position',
  count_projects: 'Projects', count_invoices: 'Invoices', count_invoices_done: 'done',
  count_employees: 'Employees', total_project_cost: 'Total Project Cost',
  chart_monthly_income: 'Monthly Invoice Income', chart_top_customers: 'Top Customers',
  chart_monthly_expenses: 'Monthly Expenses', chart_projects_cost: 'Projects by Cost',
  col_project_label: 'Project', col_cost_label: 'Cost',
  proj_title: 'Projects', proj_subtitle: 'Cost, installation & funding per project',
  search_projects: 'Search projects...', new_project: '+ New Project',
  col_project: 'Project', col_cost: 'Project Cost', col_installation: 'Installation',
  col_payed: 'Payed', col_remain: 'Remain', col_status: 'Status',
  new_project_title: 'New Project', field_proj_name: 'Project Name', field_client: 'Client',
  confirm_delete_project: 'Delete this project?',
  back_projects: '‹ Back to Projects', proj_detail_subtitle: 'Project cost, installation & funding detail',
  stat_project_cost: 'Project Cost', stat_installation: 'Installation',
  stat_total_payed: 'Total Payed', stat_remain: 'Remain',
  stat_hesham: 'Hesham Fund', stat_sayed: 'Sayed Fund',
  tab_cost: 'Cost Items', tab_install: 'Installation Items', add_item: '+ Add Item',
  no_items: 'No items', col_item: 'Item', col_item_name: 'Name',
  col_unit_price: 'Unit Price', col_qty: 'Qty', col_total: 'Total',
  add_cost_item: 'Add Cost Item', add_install_item: 'Add Installation Item',
  field_total_auto: 'Total (leave blank to auto-calc)', confirm_delete_item: 'Delete this item?',
  fund_title: 'Fund Ledger', fund_subtitle: 'All in/out movements of the main fund',
  current_balance: 'Current Fund Balance', col_project_party: 'Project/Party',
  col_item_field: 'Item', col_category: 'Category', col_in: 'In', col_out: 'Out', col_balance: 'Balance',
  exp_title: 'Expenses', exp_subtitle: 'Office & operating expenses ledger', col_source: 'Source',
  sal_title: 'Salaries', sal_subtitle: 'Monthly employee salary payments',
  col_employee: 'Employee', col_month: 'Month', col_year: 'Year', field_month: 'Month (1-12)',
  inv_title: 'Invoices', inv_subtitle: 'Client invoices & payment status',
  col_inv_no: 'Invoice No.', col_customer: 'Customer', col_subtotal: 'Subtotal',
  col_vat: 'VAT', col_inv_total: 'Total', col_inv_status: 'Status',
  col_remain_sz: 'Remain (Smart Zone)', status_done: 'Done', status_inprogress: 'In Progress',
  field_done: 'Done?', field_inprogress: 'In Progress?',
  field_commission3: 'Commission 3%', field_commission1: 'Commission 1%',
  field_remain_sz: 'Remain (Smart Zone)', field_remain_customer: 'Remain (Customer)', field_deposit: 'Deposit',
  emp_title: 'Employees', emp_subtitle: 'Staff directory',
  col_name: 'Name', col_role: 'Role', col_active: 'Status',
  active: 'Active', inactive: 'Inactive', field_active: 'Active?',
};

interface LangContextValue {
  t: Translations;
  toggle: () => void;
  locale: string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const t = locale === 'ar' ? ar : en;

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = locale;
  }, [locale, t.dir]);

  const toggle = () => setLocale((l) => (l === 'ar' ? 'en' : 'ar'));

  return <LangContext.Provider value={{ t, toggle, locale }}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
