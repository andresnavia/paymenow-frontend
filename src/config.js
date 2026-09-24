// -----------------------------------------------------------------------
// Configuración central de conexión al backend.
// Rutas confirmadas contra el Swagger real (http://localhost:8080/api/v1).
// Si algún endpoint cambia, este es el ÚNICO archivo que necesitas tocar.
// -----------------------------------------------------------------------

export const API_BASE_URL = 'http://localhost:8080/api/v1'

// Ruta relativa (a partir de API_BASE_URL) para cada entidad.
export const ENDPOINTS = {
  tiposIdentificacion: '/tipos-identificacion',
  persona: '/personas',
  plataforma: '/plataformas',
  cuenta: '/cuentas',
  cuentaAsociada: '/cuentas-asociadas',
  estadosPago: '/estados-pago',
  pagos: '/pagos',
  parametros: '/parametros',
}
