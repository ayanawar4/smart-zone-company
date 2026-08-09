import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import StatCard from '../components/StatCard';
import { useLang } from '../lang';
import { api } from '../api';
import { money } from '../utils';

interface CostItem { id: number; item: string; unitPrice: number; qty: number; totalPrice: number; }
interface InstallItem { id: number; date: string; name: string; unitPrice: number; qty: number; totalPrice: number; }

interface ProjectDetail {
  id: number;
  name: string;
  client: string;
  status: string;
  projectCostTotal: number;
  installationTotal: number;
  totalPayed: number;
  remain: number;
  hesham: number;
  sayed: number;
  costItems: CostItem[];
  installItems: InstallItem[];
}

type Tab = 'cost' | 'install';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLang();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [tab, setTab] = useState<Tab>('cost');
  const [modal, setModal] = useState<Tab | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});

  const load = () => {
    api.get<ProjectDetail>(`/projects/${id}`).then(setProject);
  };

  useEffect(() => { load(); }, [id]);

  if (!project) return <div className="page"><p>{t.loading}</p></div>;

  const openAdd = (type: Tab) => {
    setForm(type === 'cost'
      ? { item: '', unitPrice: 0, qty: 1, totalPrice: 0 }
      : { date: '', name: '', unitPrice: 0, qty: 1, totalPrice: 0 }
    );
    setModal(type);
  };

  const handleSave = async () => {
    const endpoint = modal === 'cost'
      ? `/projects/${id}/cost-items`
      : `/projects/${id}/install-items`;
    await api.post(endpoint, form);
    setModal(null);
    load();
  };

  const handleDeleteItem = async (type: Tab, itemId: number) => {
    if (!window.confirm(t.confirm_delete_item)) return;
    const endpoint = type === 'cost'
      ? `/projects/${id}/cost-items/${itemId}`
      : `/projects/${id}/install-items/${itemId}`;
    await api.delete(endpoint);
    load();
  };

  const setField = (key: string, val: unknown) => setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="page">
      <button className="btn-back" onClick={() => navigate('/projects')}>{t.back_projects}</button>

      <div className="page-header">
        <div>
          <h1>{project.name}</h1>
          <p className="subtitle">{project.client} — {t.proj_detail_subtitle}</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard label={t.stat_project_cost} value={money(project.projectCostTotal)} color="#4f8ef7" />
        <StatCard label={t.stat_installation} value={money(project.installationTotal)} color="#4fc97a" />
        <StatCard label={t.stat_total_payed} value={money(project.totalPayed)} color="#f7874f" />
        <StatCard label={t.stat_remain} value={money(project.remain)} color="#f74f6e" />
        <StatCard label={t.stat_hesham} value={money(project.hesham)} />
        <StatCard label={t.stat_sayed} value={money(project.sayed)} />
      </div>

      <div className="tabs">
        <button className={tab === 'cost' ? 'tab active' : 'tab'} onClick={() => setTab('cost')}>{t.tab_cost}</button>
        <button className={tab === 'install' ? 'tab active' : 'tab'} onClick={() => setTab('install')}>{t.tab_install}</button>
      </div>

      {tab === 'cost' && (
        <div>
          <div className="section-actions">
            <button className="btn-primary" onClick={() => openAdd('cost')}>{t.add_item}</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t.col_item}</th>
                  <th>{t.col_unit_price}</th>
                  <th>{t.col_qty}</th>
                  <th>{t.col_total}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {project.costItems.length === 0
                  ? <tr><td colSpan={5} className="no-data">{t.no_items}</td></tr>
                  : project.costItems.map((ci) => (
                    <tr key={ci.id}>
                      <td>{ci.item}</td>
                      <td>{money(ci.unitPrice)}</td>
                      <td>{ci.qty}</td>
                      <td>{money(ci.totalPrice)}</td>
                      <td className="actions">
                        <button className="btn-delete" onClick={() => handleDeleteItem('cost', ci.id)}>{t.delete}</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'install' && (
        <div>
          <div className="section-actions">
            <button className="btn-primary" onClick={() => openAdd('install')}>{t.add_item}</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t.col_date}</th>
                  <th>{t.col_item_name}</th>
                  <th>{t.col_unit_price}</th>
                  <th>{t.col_qty}</th>
                  <th>{t.col_total}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {project.installItems.length === 0
                  ? <tr><td colSpan={6} className="no-data">{t.no_items}</td></tr>
                  : project.installItems.map((ii) => (
                    <tr key={ii.id}>
                      <td>{ii.date}</td>
                      <td>{ii.name}</td>
                      <td>{money(ii.unitPrice)}</td>
                      <td>{ii.qty}</td>
                      <td>{money(ii.totalPrice)}</td>
                      <td className="actions">
                        <button className="btn-delete" onClick={() => handleDeleteItem('install', ii.id)}>{t.delete}</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modal && (
        <Modal title={modal === 'cost' ? t.add_cost_item : t.add_install_item} onClose={() => setModal(null)}>
          <div className="form-fields">
            {modal === 'install' && (
              <div className="field">
                <label>{t.col_date}</label>
                <input type="date" value={String(form.date ?? '')} onChange={(e) => setField('date', e.target.value)} />
              </div>
            )}
            <div className="field">
              <label>{modal === 'cost' ? t.col_item : t.col_item_name}</label>
              <input
                value={String(modal === 'cost' ? (form.item ?? '') : (form.name ?? ''))}
                onChange={(e) => setField(modal === 'cost' ? 'item' : 'name', e.target.value)}
              />
            </div>
            <div className="field">
              <label>{t.col_unit_price}</label>
              <input type="number" value={String(form.unitPrice ?? 0)} onChange={(e) => setField('unitPrice', Number(e.target.value))} />
            </div>
            <div className="field">
              <label>{t.col_qty}</label>
              <input type="number" value={String(form.qty ?? 1)} onChange={(e) => setField('qty', Number(e.target.value))} />
            </div>
            <div className="field">
              <label>{t.field_total_auto}</label>
              <input type="number" value={String(form.totalPrice ?? 0)} onChange={(e) => setField('totalPrice', Number(e.target.value))} />
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn-primary" onClick={handleSave}>{t.save}</button>
            <button className="btn-secondary" onClick={() => setModal(null)}>{t.cancel}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
