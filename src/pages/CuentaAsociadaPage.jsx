import EntityCrudPage from '../components/crud/EntityCrudPage'
import Badge from '../components/ui/Badge'
import cuentaAsociadaApi from '../api/cuentaAsociada'
import cuentaApi from '../api/cuenta'
import personaApi from '../api/persona'

const fields = [
  {
    name: 'idCuen',
    label: 'Cuenta',
    type: 'select',
    required: true,
    optionsSource: {
      api: cuentaApi,
      valueKey: 'idCuen',
      getLabel: (item) => `Cuenta #${item.idCuen}`,
    },
  },
  {
    name: 'idPers',
    label: 'Persona asociada',
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
  {
    name: 'notifica',
    label: 'Recibe notificaciones',
    type: 'select',
    required: true,
    defaultValue: 'S',
    options: [
      { value: 'S', label: 'Sí' },
      { value: 'N', label: 'No' },
    ],
  },
]

const columns = [
  { key: 'idCuas', header: 'ID' },
  { key: 'idCuen', header: 'ID Cuenta' },
  { key: 'idPers', header: 'ID Persona' },
  {
    key: 'activo',
    header: 'Estado',
    render: (row) => (
      <Badge tone={row.activo === 'S' ? 'positive' : 'negative'}>
        {row.activo === 'S' ? 'Activa' : 'Inactiva'}
      </Badge>
    ),
  },
  {
    key: 'notifica',
    header: 'Notifica',
    render: (row) => <Badge tone="neutral">{row.notifica === 'S' ? 'Sí' : 'No'}</Badge>,
  },
]

export default function CuentaAsociadaPage() {
  return (
    <EntityCrudPage
      title="Cuentas asociadas"
      description="Personas adicionales que comparten una cuenta y sus preferencias de notificación."
      api={cuentaAsociadaApi}
      rowKey="idCuas"
      columns={columns}
      fields={fields}
      emptyLabel="cuentas asociadas"
    />
  )
}
