import { Pencil, Trash2 } from 'lucide-react'
import Button from '../ui/Button'

export default function DataTable({ columns, rows, rowKey, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-100 bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-brand-100">
          <thead className="bg-brand-50/60">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="th-cell">
                  {col.header}
                </th>
              ))}
              <th className="th-cell text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-50">
            {rows.map((row) => (
              <tr key={row[rowKey]} className="hover:bg-brand-50/40">
                {columns.map((col) => (
                  <td key={col.key} className="td-cell">
                    {col.render ? col.render(row) : row[col.key] ?? '—'}
                  </td>
                ))}
                <td className="td-cell">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      className="px-2 py-1.5"
                      onClick={() => onEdit(row)}
                      aria-label="Editar"
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-2 py-1.5 text-red-600 hover:bg-red-50"
                      onClick={() => onDelete(row)}
                      aria-label="Eliminar"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
