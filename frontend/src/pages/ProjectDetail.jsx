import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { money } from '../utils';
import Modal from '../components/Modal';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('cost');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({});

  const load = () => {
    api.get(`/projects/${id}`).then(setProject).catch((e) => setError(e.message));
  };
  useEffect(load, [id]);

  if (error) return <div className="error-banner">{error}</div>;
  if (!project) return <div className="loading">جاري التحميل... / Loading...</div>;

  const openAdd = () => {
    setForm(tab === 'cost' ? { item: '', unitPrice: '', qty: 1, totalPrice: '' } : { date: '', name: '', unitPrice: '', qty: 1, totalPrice: '' });
    setModalOpen(true);
  };

  const save = async () => {
    const payload = { ...form };
    ['unitPrice', 'qty', 'totalPrice'].forEach((k) => (payload[k] = payload[k] === '' ? 0 : Number(payload[k])));
    const path = tab === 'cost' ? `/projects/${id}/cost-items` : `/projects/${id}/install-items`;
    await api.post(path, payload);
    setModalOpen(false);
    load();
  };

  const removeItem = async (itemId) => {
    if (!window.confirm('حذف هذا البند؟ / Delete this item?')) return;
    const path = tab === 'cost' ? `/projects/${id}/cost-items/${itemId}` : `/projects/${id}/install-items/${itemId}`;
    await api.delete(path);
    load();
  };

  const items = tab === 'cost' ? project.costItems : project.installItems;

  return (
    <div>
      <Link to="/projects" className="link-btn">‹ رجوع للمشاريع / Back to Projects</Link>
      <div className="page-title" style={{ marginTop: 10 }}>{project.name}</div>
      <div className="page-subtitle">تفاصيل تكلفة المشروع والتركيب والتمويل / Project cost, installation & funding detail</div>

      <div className="stat-grid">
        <div className="stat-card"><div className="label">تكلفة المشروع · Project Cost</div><div className="value">{money(project.projectCostTotal)}</div></div>
        <div className="stat-card"><div className="label">التركيب · Installation</div><div className="value">{money(project.installationTotal)}</div></div>
        <div className="stat-card"><div className="label">المدفوع · Total Payed</div><div className="value">{money(project.totalPayed)}</div></div>
        <div className="stat-card"><div className="label">المتبقي · Remain</div><div className={`value ${project.remain < 0 ? 'negative' : ''}`}>{money(project.remain)}</div></div>
        <div className="stat-card"><div className="label">تمويل هشام · Hesham Fund</div><div className="value">{money(project.hesham)}</div></div>
        <div className="stat-card"><div className="label">تمويل سيد · Sayed Fund</div><div className="value">{money(project.sayed)}</div></div>
      </div>

      <div className="section-tabs">
        <button className={tab === 'cost' ? 'active' : ''} onClick={() => setTab('cost')}>بنود التكلفة · Cost Items ({project.costItems.length})</button>
        <button className={tab === 'install' ? 'active' : ''} onClick={() => setTab('install')}>بنود التركيب · Installation Items ({project.installItems.length})</button>
      </div>

      <div className="panel">
        <div className="toolbar" style={{ marginBottom: 12 }}>
          <div />
          <button className="btn" onClick={openAdd}>+ إضافة بند / Add Item</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {tab === 'install' && <th>التاريخ · Date</th>}
                <th>{tab === 'cost' ? 'الصنف · Item' : 'الاسم · Name'}</th>
                <th>سعر الوحدة · Unit Price</th>
                <th>الكمية · Qty</th>
                <th>الإجمالي · Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id}>
                  {tab === 'install' && <td>{it.date}</td>}
                  <td>{tab === 'cost' ? it.item : it.name}</td>
                  <td>{money(it.unitPrice)}</td>
                  <td>{it.qty}</td>
                  <td>{money(it.totalPrice)}</td>
                  <td><button className="btn danger small" onClick={() => removeItem(it.id)}>حذف</button></td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={6} className="empty-state">لا توجد بنود / No items</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <Modal title={tab === 'cost' ? 'إضافة بند تكلفة / Add Cost Item' : 'إضافة بند تركيب / Add Installation Item'} onClose={() => setModalOpen(false)}>
          <div className="form-grid">
            {tab === 'install' && (
              <div className="form-field">
                <label>التاريخ · Date</label>
                <input type="date" value={form.date || ''} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
            )}
            <div className="form-field">
              <label>{tab === 'cost' ? 'الصنف · Item' : 'الاسم · Name'}</label>
              <input
                value={tab === 'cost' ? form.item || '' : form.name || ''}
                onChange={(e) => setForm({ ...form, [tab === 'cost' ? 'item' : 'name']: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>سعر الوحدة · Unit Price</label>
              <input type="number" value={form.unitPrice ?? ''} onChange={(e) => setForm({ ...form, unitPrice: e.target.value })} />
            </div>
            <div className="form-field">
              <label>الكمية · Qty</label>
              <input type="number" value={form.qty ?? ''} onChange={(e) => setForm({ ...form, qty: e.target.value })} />
            </div>
            <div className="form-field">
              <label>الإجمالي · Total (leave blank to auto-calc)</label>
              <input type="number" value={form.totalPrice ?? ''} onChange={(e) => setForm({ ...form, totalPrice: e.target.value })} />
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn secondary" onClick={() => setModalOpen(false)}>إلغاء / Cancel</button>
            <button className="btn" onClick={save}>حفظ / Save</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
