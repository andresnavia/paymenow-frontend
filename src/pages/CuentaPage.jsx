import EntityCrudPage from '../components/crud/EntityCrudPage'
import Badge from '../components/ui/Badge'
import cuentaApi from '../api/cuenta'
import plataformaApi from '../api/plataforma'
import personaApi from '../api/persona'

const fields = [
  {
    name: 'idPlat',
    label: 'Plataforma',
    type: 'select',
    required: true,
    optionsSource: {
      api: plataformaApi,
      valueKey: 'idPlat',
      getLabel: (item) => item.nombre,
    },
  },
  {
    name: 'idPers',
    label: 'Titular',
    type: 'select',
    required: true,
    optionsSource: {
      api: personaApi,
      valueKey: 'idPers',
      getLabel: (item) => `${item.primerNombre} ${item.primerApellido}`,
    },
  },
  {
    name: 'activo',
    label: 'Activo',
    type: 'select',
    required: true,
    defaultValue: 'S',
    options: [
      { value: 'S', label: 'Sí' },
      { value: 'N', label: 'No' },
    ],
  },
  { name: 'fechaPago', label: 'Fecha de pago', type: 'date', required: true },
]

const columns = [
  { key: 'idCuen', header: 'ID' },
  { key: 'idPlat', header: 'ID Plataforma' },
  { key: 'idPers', header: 'ID Titular' },
  { key: 'fechaPago', header: 'Fecha de pago' },
  {
    key: 'activo',
    header: 'Estado',
    render: (row) => (
      <Badge tone={row.activo === 'S' ? 'positive' : 'negative'}>
        {row.activo === 'S' ? 'Activa' : 'Inactiva'}
      </Badge>
    ),
  },
]

export default function CuentaPage() {
  return (
    <EntityCrudPage
      title="Cuentas"
      description="Cuentas contratadas en cada plataforma, asociadas a un titular."
      api={cuentaApi}
      rowKey="idCuen"
      columns={columns}
      fields={fields}
      emptyLabel="cuentas"
    />
  )
}
