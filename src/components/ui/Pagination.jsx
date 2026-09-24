import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button'

export default function Pagination({
  page,
  totalPages,
  totalElements,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}) {
  const canPrev = page > 0
  const canNext = page + 1 < totalPages

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-ink/70">
      <div className="flex items-center gap-2">
        <label htmlFor="page-size" className="whitespace-nowrap">
          Filas por página
        </label>
        <select
          id="page-size"
          className="input-field w-auto py-1.5"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <span className="whitespace-nowrap">
          Página {totalPages === 0 ? 0 : page + 1} de {totalPages} · {totalElements} registros
        </span>
        <div className="flex gap-1">
          <Button
            variant="secondary"
            className="px-2 py-1.5"
            onClick={() => onPageChange(page - 1)}
            disabled={!canPrev}
            aria-label="Página anterior"
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="secondary"
            className="px-2 py-1.5"
            onClick={() => onPageChange(page + 1)}
            disabled={!canNext}
            aria-label="Página siguiente"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
