export default function Spinner({ label = 'Cargando...' }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-brand-600">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-200 border-t-brand-500" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}
