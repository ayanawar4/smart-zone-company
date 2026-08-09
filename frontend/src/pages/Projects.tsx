import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { useLang } from '../lang';
import { api } from '../api';
import { money } from '../utils';

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  projectCostTotal: number;
  installationTotal: number;
  totalPayed: number;
  remain: number;
}

export default function Projects() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', client: '' });

  const load = () => {
    setLoading(true);
    api.get<Project[]>('/projects').then((data) => {
      setProjects(data);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const filtered = projects.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.client ?? '').toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    await api.post('/projects', form);
    setModal(false);
    setForm({ name: '', client: '' });
    load();
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(t.confirm_delete_project)) return;
    await api.delete(`/projects/${id}`);
    load();
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>{t.proj_title}</h1>
          <p className="subtitle">{t.proj_subtitle}</p>
        </div>
        <button className="btn-primary" onClick={() => setModal(true)}>{t.new_project}</button>
      </div>

      <input
        className="search-input"
        placeholder={t.search_projects}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? <p>{t.loading}</p> : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>{t.col_project}</th>
                <th>{t.field_client}</th>
                <th>{t.col_cost}</th>
                <th>{t.col_installation}</th>
                <th>{t.col_payed}</th>
                <th>{t.col_remain}</th>
                <th>{t.col_status}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="no-data">{t.no_records}</td></tr>
              ) : filtered.map((p) => (
                <tr key={p.id} className="clickable" onClick={() => navigate(`/projects/${p.id}`)}>
                  <td>{p.name}</td>
                  <td>{p.client}</td>
                  <td>{money(p.projectCostTotal)}</td>
                  <td>{money(p.installationTotal)}</td>
                  <td>{money(p.totalPayed)}</td>
                  <td>{money(p.remain)}</td>
                  <td><span className={`badge badge-${p.status}`}>{p.status}</span></td>
                  <td className="actions" onClick={(e) => e.stopPropagation()}>
                    <button className="btn-delete" onClick={(e) => handleDelete(p.id, e)}>{t.delete}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <Modal title={t.new_project_title} onClose={() => setModal(false)}>
          <div className="form-fields">
            <div className="field">
              <label>{t.field_proj_name}</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="field">
              <label>{t.field_client}</label>
              <input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn-primary" onClick={handleAdd}>{t.save}</button>
            <button className="btn-secondary" onClick={() => setModal(false)}>{t.cancel}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
