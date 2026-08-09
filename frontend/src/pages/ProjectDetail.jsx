import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { useLang } from '../lang';
import { money } from '../utils';
import Modal from '../components/Modal';

export default function ProjectDetail() {
  const { t } = useLang();
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
  if (!project) return <div className="loading">{t.loading}</div>;

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
    if (!window.confirm(t.confirm_delete_item)) return;
    const path = tab === 'cost' ? `/projects/${id}/cost-items/${itemId}` : `/projects/${id}/install-items/${itemId}`;
    await api.delete(path);
    load();
  };

  const items = tab === 'cost' ? project.costItems : project.installItems;

  return (
    <div>
      <Link to="/projects" className="link-btn">{t.back_projects}</Link>
      <div className="page-title" style={{ marginTop: 10 }}>{project.name}</div>
      <div className="page-subtitle">{t.proj_detail_subtitle}</div>

      <div className="stat-grid">
        <div className="stat-card"><div className="label">{t.stat_project_cost}</div><div className="value">{money(project.projectCostTotal)}</div></div>
        <div className="stat-card"><div className="label">{t.stat_installation}</div><div className="value">{money(project.installationTotal)}</div></div>
        <div className="stat-card"><div className="label">{t.stat_total_payed}</div><div className="value">{money(project.totalPayed)}</div></div>
        <div className="stat-card"><div className="label">{t.stat_remain}</div><div className={`value ${project.remain < 0 ? 'negative' : ''}`}>{money(project.remain)}</div></div>
        <div className="stat-card"><div className="label">{t.stat_hesham}</div><div className="value">{money(project.hesham)}</div></div>
        <div className="stat-card"><div className="label">{t.stat_sayed}</div><div className="value">{money(project.sayed)}</div></div>
      </div>

      <div className="section-tabs">
        <button className={tab === 'cost' ? 'active' : ''} onClick={() => setTab('cost')}>{t.tab_cost} ({project.costItems.length})</button>
        <button className={tab === 'install' ? 'active' : ''} onClick={() => setTab('install')}>{t.tab_install} ({project.installItems.length})</button>
      </div>

      <div className="panel">
        <div className="toolbar" style={{ marginBottom: 12 }}>
          <div />
          <button className="btn" onClick={openAdd}>{t.add_item}</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {tab === 'install' && <th>{t.col_date}</th>}
                <th>{tab === 'cost' ? t.col_item : t.col_item_name}</th>
                <th>{t.col_unit_price}</th>
                <th>{t.col_qty}</th>
                <th>{t.col_total}</th>
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
                  <td><button className="btn danger small" onClick={() => removeItem(it.id)}>{t.delete}</button></td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={6} className="empty-state">{t.no_items}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <Modal title={tab === 'cost' ? t.add_cost_item : t.add_install_item} onClose={() => setModalOpen(false)}>
          <div className="form-grid">
            {tab === 'install' && (
              <div className="form-field">
                <label>{t.col_date}</label>
                <input type="date" value={form.date || ''} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
            )}
            <div className="form-field">
              <label>{tab === 'cost' ? t.col_item : t.col_item_name}</label>
              <input
                value={tab === 'cost' ? form.item || '' : form.name || ''}
                onChange={(e) => setForm({ ...form, [tab === 'cost' ? 'item' : 'name']: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>{t.col_unit_price}</label>
              <input type="number" value={form.unitPrice ?? ''} onChange={(e) => setForm({ ...form, unitPrice: e.target.value })} />
            </div>
            <div className="form-field">
              <label>{t.col_qty}</label>
              <input type="number" value={form.qty ?? ''} onChange={(e) => setForm({ ...form, qty: e.target.value })} />
            </div>
            <div className="form-field">
              <label>{t.field_total_auto}</label>
              <input type="number" value={form.totalPrice ?? ''} onChange={(e) => setForm({ ...form, totalPrice: e.target.value })} />
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn secondary" onClick={() => setModalOpen(false)}>{t.cancel}</button>
            <button className="btn" onClick={save}>{t.save}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
