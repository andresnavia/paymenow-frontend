import EntityCrudPage from '../components/crud/EntityCrudPage'
import parametrosApi from '../api/parametros'

const fields = [
  { name: 'nombre', label: 'Nombre', type: 'text', required: true },
  { name: 'valor', label: 'Valor', type: 'text', required: true },
  { name: 'descripcion', label: 'Descripción', type: 'textarea', fullWidth: true },
]

const columns = [
  { key: 'idPara', header: 'ID' },
  { key: 'nombre', header: 'Parámetro' },
  { key: 'valor', header: 'Valor' },
  { key: 'descripcion', header: 'Descripción' },
]

export default function ParametrosPage() {
  return (
    <EntityCrudPage
      title="Parámetros"
      description="Valores de configuración generales usados por la aplicación."
      api={parametrosApi}
      rowKey="idPara"
      columns={columns}
      fields={fields}
      emptyLabel="parámetros"
    />
  )
}
