import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import TiposIdentificacionPage from './pages/TiposIdentificacionPage'
import PersonaPage from './pages/PersonaPage'
import PlataformaPage from './pages/PlataformaPage'
import CuentaPage from './pages/CuentaPage'
import CuentaAsociadaPage from './pages/CuentaAsociadaPage'
import EstadosPagoPage from './pages/EstadosPagoPage'
import PagosPage from './pages/PagosPage'
import ParametrosPage from './pages/ParametrosPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/plataformas" element={<PlataformaPage />} />
        <Route path="/cuentas" element={<CuentaPage />} />
        <Route path="/cuentas-asociadas" element={<CuentaAsociadaPage />} />
        <Route path="/personas" element={<PersonaPage />} />
        <Route path="/pagos" element={<PagosPage />} />
        <Route path="/estados-pago" element={<EstadosPagoPage />} />
        <Route path="/tipos-identificacion" element={<TiposIdentificacionPage />} />
        <Route path="/parametros" element={<ParametrosPage />} />
      </Route>
    </Routes>
  )
}
