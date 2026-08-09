import { useState, useEffect, ReactNode } from 'react';
import Modal from './Modal';
import { useLang } from '../lang';
import { api } from '../api';
import { money } from '../utils';

interface ColDef<T> {
  key: keyof T;
  label: string;
  render?: (val: unknown, row: T) => ReactNode;
}

interface FieldDef {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'checkbox' | 'select';
  options?: { value: string; label: string }[];
  readOnly?: boolean;
}

interface CrudPageProps<T extends { id: number }> {
  title: string;
  subtitle: string;
  endpoint: string;
  columns: ColDef<T>[];
  fields: FieldDef[];
  defaultForm: Partial<T>;
  moneyKeys?: (keyof T)[];
  searchKeys?: (keyof T)[];
}

export default function CrudPage<T extends { id: number }>({
  title,
  subtitle,
  endpoint,
  columns,
  fields,
  defaultForm,
  moneyKeys = [],
  searchKeys = [],
}: CrudPageProps<T>) {
  const { t } = useLang();
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [form, setForm] = useState<Partial<T>>(defaultForm);
  const [editId, setEditId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    api.get<T[]>(endpoint).then((data) => {
      setRows(data);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, [endpoint]);

  const filtered = rows.filter((r) => {
    if (!search) return true;
    return searchKeys.some((k) => String(r[k] ?? '').toLowerCase().includes(search.toLowerCase()));
  });

  const openAdd = () => {
    setForm(defaultForm);
    setEditId(null);
    setModal('add');
  };

  const openEdit = (row: T) => {
    setForm({ ...row });
    setEditId(row.id);
    setModal('edit');
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(t.confirm_delete)) return;
    await api.delete(`${endpoint}/${id}`);
    load();
  };

  const handleSave = async () => {
    if (editId !== null) {
      await api.patch(`${endpoint}/${editId}`, form);
    } else {
      await api.post(endpoint, form);
    }
    setModal(null);
    load();
  };

  const handleField = (key: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>{title}</h1>
          <p className="subtitle">{subtitle}</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>{t.add}</button>
      </div>

      {searchKeys.length > 0 && (
        <input
          className="search-input"
          placeholder={t.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {loading ? (
        <p>{t.loading}</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {columns.map((c) => <th key={String(c.key)}>{c.label}</th>)}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={columns.length + 1} className="no-data">{t.no_records}</td></tr>
              ) : filtered.map((row) => (
                <tr key={row.id}>
                  {columns.map((c) => (
                    <td key={String(c.key)}>
                      {c.render
                        ? c.render(row[c.key], row)
                        : moneyKeys.includes(c.key)
                          ? money(row[c.key] as number)
                          : String(row[c.key] ?? '')}
                    </td>
                  ))}
                  <td className="actions">
                    <button className="btn-edit" onClick={() => openEdit(row)}>{t.edit}</button>
                    <button className="btn-delete" onClick={() => handleDelete(row.id)}>{t.delete}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <Modal
          title={modal === 'add' ? t.add_record : t.edit_record}
          onClose={() => setModal(null)}
        >
          <div className="form-fields">
            {fields.map((f) => (
              <div className="field" key={f.key}>
                <label>{f.label}</label>
                {f.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    checked={Boolean((form as Record<string, unknown>)[f.key])}
                    onChange={(e) => handleField(f.key, e.target.checked)}
                  />
                ) : f.type === 'select' && f.options ? (
                  <select
                    value={String((form as Record<string, unknown>)[f.key] ?? '')}
                    onChange={(e) => handleField(f.key, e.target.value)}
                  >
                    {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                ) : (
                  <input
                    type={f.type ?? 'text'}
                    value={String((form as Record<string, unknown>)[f.key] ?? '')}
                    readOnly={f.readOnly}
                    onChange={(e) => handleField(f.key, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                  />
                )}
              </div>
            ))}
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
