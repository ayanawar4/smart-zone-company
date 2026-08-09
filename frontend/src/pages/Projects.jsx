import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { money } from '../utils';
import Modal from '../components/Modal';

export default function Projects() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', client: '', status: 'active' });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.get('/projects').then(setRows).catch((e) => setError(e.message)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const filtered = rows.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));

  const create = async () => {
    setSaving(true);
    try {
      await api.post('/projects', form);
      setModalOpen(false);
      setForm({ name: '', client: '', status: 'active' });
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('هل تريد حذف هذا المشروع؟ / Delete this project?')) return;
    await api.delete(`/projects/${id}`);
    load();
  };

  return (
    <div>
      <div className="page-title">المشاريع · Projects</div>
      <div className="page-subtitle">تكلفة كل مشروع، التركيب، والتمويل / Cost, installation & funding per project</div>
      {error && <div className="error-banner">{error}</div>}

      <div className="toolbar">
        <input className="search-input" placeholder="بحث عن مشروع... / Search projects..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="btn" onClick={() => setModalOpen(true)}>+ مشروع جديد / New Project</button>
      </div>

      <div className="panel">
        <div className="table-wrap">
          {loading ? (
            <div className="loading">جاري التحميل... / Loading...</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>المشروع · Project</th>
                  <th>تكلفة المشروع · Cost</th>
                  <th>التركيب · Installation</th>
                  <th>المدفوع · Payed</th>
                  <th>المتبقي · Remain</th>
                  <th>الحالة · Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td><Link to={`/projects/${p.id}`} style={{ color: '#1570ef', fontWeight: 600 }}>{p.name}</Link></td>
                    <td>{money(p.projectCostTotal)}</td>
                    <td>{money(p.installationTotal)}</td>
                    <td>{money(p.totalPayed)}</td>
                    <td style={{ color: p.remain < 0 ? '#d92d20' : undefined }}>{money(p.remain)}</td>
                    <td><span className="badge green">{p.status}</span></td>
                    <td><button className="btn danger small" onClick={() => remove(p.id)}>حذف</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modalOpen && (
        <Modal title="مشروع جديد / New Project" onClose={() => setModalOpen(false)}>
          <div className="form-grid">
            <div className="form-field">
              <label>اسم المشروع · Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-field">
              <label>العميل · Client</label>
              <input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn secondary" onClick={() => setModalOpen(false)}>إلغاء / Cancel</button>
            <button className="btn" disabled={saving || !form.name} onClick={create}>{saving ? '...' : 'حفظ / Save'}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
