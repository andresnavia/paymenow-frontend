import EntityCrudPage from '../components/crud/EntityCrudPage'
import Badge from '../components/ui/Badge'
import pagosApi from '../api/pagos'
import cuentaAsociadaApi from '../api/cuentaAsociada'
import estadosPagoApi from '../api/estadosPago'

const fields = [
  { name: 'fechaPago', label: 'Fecha de pago', type: 'date', required: true },
  {
    name: 'idCuas',
    label: 'Cuenta asociada',
    type: 'select',
    required: true,
    optionsSource: {
      api: cuentaAsociadaApi,
      valueKey: 'idCuas',
      getLabel: (item) => `Cuenta asociada #${item.idCuas}`,
    },
  },
  {
    name: 'idEspa',
    label: 'Estado del pago',
    type: 'select',
    required: true,
    optionsSource: {
      api: estadosPagoApi,
      valueKey: 'idEspa',
      getLabel: (item) => item.nombre,
    },
  },
]

const columns = [
  { key: 'idPago', header: 'ID' },
  { key: 'fechaPago', header: 'Fecha' },
  { key: 'idCuas', header: 'ID Cuenta asociada' },
  {
    key: 'idEspa',
    header: 'Estado',
    render: (row) => <Badge tone="neutral">{`Estado #${row.idEspa}`}</Badge>,
  },
]

export default function PagosPage() {
  return (
    <EntityCrudPage
      title="Pagos"
      description="Historial de pagos realizados por cada cuenta asociada."
      api={pagosApi}
      rowKey="idPago"
      columns={columns}
      fields={fields}
      emptyLabel="pagos"
    />
  )
}
