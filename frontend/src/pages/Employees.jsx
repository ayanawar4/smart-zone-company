import CrudPage from '../components/CrudPage';

export default function Employees() {
  return (
    <CrudPage
      title="الموظفون · Employees"
      subtitle="قائمة الموظفين والفريق / Staff directory"
      endpoint="/employees"
      searchKeys={['name', 'role']}
      columns={[
        { key: 'name', label: 'الاسم · Name' },
        { key: 'role', label: 'الوظيفة · Role' },
        { key: 'active', label: 'الحالة · Active', render: (v) => (v ? 'نشط · Active' : 'غير نشط · Inactive') },
      ]}
      formFields={[
        { key: 'name', label: 'الاسم · Name', type: 'text' },
        { key: 'role', label: 'الوظيفة · Role', type: 'text' },
        { key: 'active', label: 'نشط؟ · Active', type: 'checkbox', default: true },
      ]}
    />
  );
}
