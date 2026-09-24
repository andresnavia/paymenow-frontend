import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, RefreshCcw } from "lucide-react";
import DataTable from "./DataTable";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Field from "../ui/Field";
import Spinner from "../ui/Spinner";
import EmptyState from "../ui/EmptyState";
import ConfirmDialog from "../ui/ConfirmDialog";
import Pagination from "../ui/Pagination";

const emptyFormFrom = (fields) =>
  fields.reduce((acc, f) => ({ ...acc, [f.name]: f.defaultValue ?? "" }), {});

export default function EntityCrudPage({
  title,
  description,
  api,
  rowKey,
  columns,
  fields,
  emptyLabel = "registros",
  paginated = false,
  pageSizeOptions = [10, 20, 50],
  children,
  queryIdentificacion,
  onResetQuery,
}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [optionsMap, setOptionsMap] = useState({});

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [form, setForm] = useState(() => emptyFormFrom(fields));
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const selectFields = useMemo(
    () => fields.filter((f) => f.type === "select" && f.optionsSource),
    [fields],
  );
  const updateTable = async () => {
    if (queryIdentificacion) {
      onResetQuery();
    } else {
      await loadRows();
    }
  };

  const loadRows = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      if (queryIdentificacion) {
        const data = await api.getByIdentificacion(queryIdentificacion);
        const arrayData = [data];
        setRows(arrayData ?? []);
        setTotalPages(1);
        setTotalElements(1);
      } else if (paginated) {
        const data = await api.getPaginated({ page, size: pageSize });
        setRows(data?.content ?? []);
        setTotalPages(data?.totalPages ?? 0);
        setTotalElements(data?.totalElements ?? 0);
      } else {
        const data = await api.getAll();
        setRows(data ?? []);
      }
    } catch (err) {
      setError(err.friendlyMessage || "No se pudieron cargar los datos.");
    } finally {
      setLoading(false);
    }
  }, [api, paginated, page, pageSize, queryIdentificacion]);

  const handlePageSizeChange = (size) => {
    setPage(0);
    setPageSize(size);
  };

  const loadOptions = useCallback(async () => {
    const entries = await Promise.all(
      selectFields.map(async (f) => {
        try {
          const data = await f.optionsSource.api.getAll();
          const options = (data ?? []).map((item) => ({
            value: item[f.optionsSource.valueKey],
            label: f.optionsSource.getLabel(item),
          }));
          return [f.name, options];
        } catch {
          return [f.name, []];
        }
      }),
    );
    setOptionsMap(Object.fromEntries(entries));
  }, [selectFields]);

  useEffect(() => {
    loadRows();
    if (selectFields.length) loadOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadRows]);

  const fieldsWithOptions = useMemo(
    () =>
      fields.map((f) =>
        f.type === "select" && f.optionsSource
          ? { ...f, options: optionsMap[f.name] ?? [] }
          : f,
      ),
    [fields, optionsMap],
  );

  const openCreate = () => {
    setEditingRow(null);
    setForm(emptyFormFrom(fields));
    setFormErrors({});
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditingRow(row);
    setForm(
      fields.reduce((acc, f) => ({ ...acc, [f.name]: row[f.name] ?? "" }), {}),
    );
    setFormErrors({});
    setModalOpen(true);
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const errs = {};
    fields.forEach((f) => {
      if (f.required && !String(form[f.name] ?? "").trim()) {
        errs[f.name] = "Este campo es obligatorio.";
      }
    });
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildPayload = () => {
    const payload = { ...form };
    fields.forEach((f) => {
      if (f.type === "number" && payload[f.name] !== "") {
        payload[f.name] = Number(payload[f.name]);
      }
      if (f.type === "select" && payload[f.name] !== "") {
        const opt = fieldsWithOptions.find((x) => x.name === f.name);
        const isNumericId = opt?.options?.some(
          (o) => typeof o.value === "number",
        );
        payload[f.name] = isNumericId
          ? Number(payload[f.name])
          : payload[f.name];
      }
    });
    return payload;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    setError("");
    try {
      const payload = buildPayload();
      if (editingRow) {
        await api.update(editingRow[rowKey], payload);
      } else {
        await api.create(payload);
      }
      setModalOpen(false);
      if (queryIdentificacion) {
        onResetQuery();
      } else {
        await loadRows();
      }
    } catch (err) {
      setError(err.friendlyMessage || "No se pudo guardar el registro.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.remove(deleteTarget[rowKey]);
      setDeleteTarget(null);
      if (queryIdentificacion) {
        onResetQuery();
      } else {
        await loadRows();
      }
    } catch (err) {
      setError(err.friendlyMessage || "No se pudo eliminar el registro.");
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-ink/60">{description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={updateTable} disabled={loading}>
            <RefreshCcw size={16} /> Actualizar
          </Button>
          <Button onClick={openCreate}>
            <Plus size={16} /> Nuevo
          </Button>
        </div>
        <div className="flex gap-2">{children}</div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : (paginated ? totalElements === 0 : rows.length === 0) ? (
        <EmptyState
          title={`Aún no hay ${emptyLabel}`}
          description="Crea el primer registro para empezar."
          action={
            <Button onClick={openCreate}>
              <Plus size={16} /> Nuevo
            </Button>
          }
        />
      ) : (
        <>
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={rowKey}
            onEdit={openEdit}
            onDelete={setDeleteTarget}
          />
          {paginated && (
            <Pagination
              page={page}
              totalPages={totalPages}
              totalElements={totalElements}
              pageSize={pageSize}
              pageSizeOptions={pageSizeOptions}
              onPageChange={setPage}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          editingRow
            ? `Editar ${title.toLowerCase()}`
            : `Nuevo registro · ${title}`
        }
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setModalOpen(false)}
              disabled={saving}
            >
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fieldsWithOptions.map((f) => (
            <div key={f.name} className={f.fullWidth ? "sm:col-span-2" : ""}>
              <Field
                field={f}
                value={form[f.name]}
                onChange={handleChange}
                error={formErrors[f.name]}
              />
            </div>
          ))}
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        message={`Esta acción eliminará el registro de forma permanente. ¿Deseas continuar?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
