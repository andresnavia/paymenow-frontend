import EntityCrudPage from '../components/crud/EntityCrudPage'
import estadosPagoApi from '../api/estadosPago'

const fields = [
  { name: 'nombre', label: 'Nombre', type: 'text', required: true, placeholder: 'Pendiente, Pagado...' },
  { name: 'descripcion', label: 'Descripción', type: 'textarea', fullWidth: true },
]

const columns = [
  { key: 'idEspa', header: 'ID' },
  { key: 'nombre', header: 'Estado' },
  { key: 'descripcion', header: 'Descripción' },
]

export default function EstadosPagoPage() {
  return (
    <EntityCrudPage
      title="Estados de pago"
      description="Catálogo de estados posibles para un pago, como Pendiente o Pagado."
      api={estadosPagoApi}
      rowKey="idEspa"
      columns={columns}
      fields={fields}
      emptyLabel="estados de pago"
    />
  )
}
