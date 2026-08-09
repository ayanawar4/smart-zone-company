import { useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import { useLang } from '../lang';
import Modal from './Modal';

export default function CrudPage({ title, subtitle, endpoint, columns, formFields, searchKeys }) {
  const { t } = useLang();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api
      .get(endpoint)
      .then(setRows)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [endpoint]);

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) =>
      (searchKeys || columns.map((c) => c.key)).some((k) =>
        String(r[k] ?? '').toLowerCase().includes(q),
      ),
    );
  }, [rows, query, columns, searchKeys]);

  const openAdd = () => {
    setEditing(null);
    const initial = {};
    formFields.forEach((f) => (initial[f.key] = f.default ?? ''));
    setForm(initial);
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    const initial = {};
    formFields.forEach((f) => (initial[f.key] = row[f.key] ?? ''));
    setForm(initial);
    setModalOpen(true);
  };

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      const payload = {};
      formFields.forEach((f) => {
        let v = form[f.key];
        if (f.type === 'number') v = v === '' ? undefined : Number(v);
        if (f.type === 'checkbox') v = !!v;
        payload[f.key] = v;
      });
      if (editing) {
        await api.patch(`${endpoint}/${editing.id}`, payload);
      } else {
        await api.post(endpoint, payload);
      }
      setModalOpen(false);
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row) => {
    if (!window.confirm(t.confirm_delete)) return;
    try {
      await api.delete(`${endpoint}/${row.id}`);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <div className="page-title">{title}</div>
      <div className="page-subtitle">{subtitle}</div>
      {error && <div className="error-banner">{error}</div>}

      <div className="toolbar">
        <input
          className="search-input"
          placeholder={t.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn" onClick={openAdd}>{t.add}</button>
      </div>

      <div className="panel">
        <div className="table-wrap">
          {loading ? (
            <div className="loading">{t.loading}</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">{t.no_records}</div>
          ) : (
            <table>
              <thead>
                <tr>
                  {columns.map((c) => (
                    <th key={c.key}>{c.label}</th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id}>
                    {columns.map((c) => (
                      <td key={c.key}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>
                    ))}
                    <td>
                      <button className="link-btn" onClick={() => openEdit(row)}>{t.edit}</button>
                      {'  '}
                      <button className="btn danger small" style={{ marginInlineStart: 8 }} onClick={() => remove(row)}>{t.delete}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modalOpen && (
        <Modal title={editing ? t.edit_record : t.add_record} onClose={() => setModalOpen(false)}>
          <div className="form-grid">
            {formFields.map((f) => (
              <div className="form-field" key={f.key}>
                <label>{f.label}</label>
                {f.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    checked={!!form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })}
                  />
                ) : (
                  <input
                    type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                    value={form[f.key] ?? ''}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="modal-actions">
            <button className="btn secondary" onClick={() => setModalOpen(false)}>{t.cancel}</button>
            <button className="btn" disabled={saving} onClick={save}>{saving ? '...' : t.save}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
