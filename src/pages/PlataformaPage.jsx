import EntityCrudPage from '../components/crud/EntityCrudPage'
import plataformaApi from '../api/plataforma'

const fields = [
  { name: 'nombre', label: 'Nombre', type: 'text', required: true, placeholder: 'Netflix, Disney+...' },
  { name: 'cantidadCuentas', label: 'Cupos por cuenta', type: 'number', required: true },
  { name: 'valor', label: 'Valor mensual', type: 'number', required: true },
  { name: 'descripcion', label: 'Descripción', type: 'textarea', fullWidth: true },
]

const columns = [
  { key: 'idPlat', header: 'ID' },
  { key: 'nombre', header: 'Plataforma' },
  { key: 'cantidadCuentas', header: 'Cupos' },
  {
    key: 'valor',
    header: 'Valor',
    render: (row) => (row.valor != null ? `$${Number(row.valor).toLocaleString('es-CO')}` : '—'),
  },
]

export default function PlataformaPage() {
  return (
    <EntityCrudPage
      title="Plataformas"
      description="Servicios de streaming disponibles para compartir, como Netflix o Disney+."
      api={plataformaApi}
      rowKey="idPlat"
      columns={columns}
      fields={fields}
      emptyLabel="plataformas"
    />
  )
}
