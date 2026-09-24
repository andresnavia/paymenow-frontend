import EntityCrudPage from '../components/crud/EntityCrudPage'
import tiposIdentificacionApi from '../api/tiposIdentificacion'

const fields = [
  { name: 'abreviatura', label: 'Abreviatura', type: 'text', required: true, placeholder: 'CC, TI, CE...' },
  { name: 'descripcion', label: 'Descripción', type: 'textarea', fullWidth: true },
]

const columns = [
  { key: 'idTiid', header: 'ID' },
  { key: 'abreviatura', header: 'Abreviatura' },
  { key: 'descripcion', header: 'Descripción' },
]

export default function TiposIdentificacionPage() {
  return (
    <EntityCrudPage
      title="Tipos de identificación"
      description="Catálogo de documentos de identidad (cédula, tarjeta de identidad, etc.)."
      api={tiposIdentificacionApi}
      rowKey="idTiid"
      columns={columns}
      fields={fields}
      emptyLabel="tipos de identificación"
    />
  )
}
