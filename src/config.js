// -----------------------------------------------------------------------
// Configuración central de conexión al backend.
// Rutas confirmadas contra el Swagger real (http://localhost:8080/api/v1).
// Si algún endpoint cambia, este es el ÚNICO archivo que necesitas tocar.
// -----------------------------------------------------------------------

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "Falta la variable de entorno VITE_API_BASE_URL. Copia .env.example a .env y define su valor.",
  );
}

// Ruta relativa (a partir de API_BASE_URL) para cada entidad.
export const ENDPOINTS = {
  tiposIdentificacion: "/tipos-identificacion",
  persona: "/personas",
  plataforma: "/plataformas",
  cuenta: "/cuentas",
  cuentaAsociada: "/cuentas-asociadas",
  estadosPago: "/estados-pago",
  pagos: "/pagos",
  parametros: "/parametros",
  rol: "/roles",
  usuario: "/usuarios",
};
