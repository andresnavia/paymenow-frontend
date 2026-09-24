# PayMeNow · Frontend

App para administrar cuentas de streaming compartidas entre varias personas: plataformas, cuentas, personas asociadas, pagos y sus estados. Consume el backend REST expuesto en `http://localhost:8080`.

## Stack

- **React 19** + **Vite 6**
- **React Router 7** (enrutamiento declarativo)
- **Tailwind CSS 3** (paleta de azules personalizada)
- **Axios** con instancia central y manejo de errores
- **lucide-react** para iconografía

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`. Asegúrate de que tu backend esté corriendo en `http://localhost:8080` y que **CORS** permita peticiones desde `http://localhost:5173` (si usas Spring Boot, un `@CrossOrigin` o una `WebMvcConfigurer` global suele bastar).

## Estructura

```
src/
  api/            -> un archivo por entidad + createCrudApi.js (factory GET/POST/PUT/DELETE)
  components/
    layout/       -> Sidebar, Topbar, Layout (shell de la app)
    ui/           -> Button, Modal, Field, Badge, Spinner, EmptyState, ConfirmDialog
    crud/         -> DataTable + EntityCrudPage (motor genérico de CRUD)
  pages/          -> una página por tabla, cada una solo define columnas y campos
  config.js       -> URL base y rutas del backend (único archivo a tocar si cambian)
  nav.js          -> menú de navegación
```

### Por qué `EntityCrudPage`

En vez de repetir listar/crear/editar/eliminar en cada una de las 8 pantallas, cada página
(`src/pages/*.jsx`) solo declara:

- `columns`: qué se muestra en la tabla
- `fields`: qué se pide en el formulario (incluye selects que se autocompletan desde otra
  entidad, por ejemplo el tipo de identificación de una persona)

`EntityCrudPage` se encarga de la carga, el modal, la validación básica y el borrado con
confirmación. Si necesitas una pantalla con comportamiento distinto, no estás obligado a usarlo:
es un componente más, no un framework.

## Endpoints usados

Base: `http://localhost:8080/api/v1` (confirmado contra tu Swagger).

| Entidad             | Ruta                        |
|---------------------|-----------------------------|
| Tipos de ident.     | `/tipos-identificacion`     |
| Personas            | `/personas`                 |
| Plataformas         | `/plataformas`              |
| Cuentas             | `/cuentas`                  |
| Cuentas asociadas   | `/cuentas-asociadas`        |
| Estados de pago     | `/estados-pago`             |
| Pagos               | `/pagos`                    |
| Parámetros          | `/parametros`               |

Cada una expone `GET` (lista), `GET /{id}`, `POST`, `PUT /{id}`, `DELETE /{id}` — CRUD estándar.
Si tu backend devuelve los campos con otros nombres o formato (por ejemplo, JSON en minúsculas
en vez de las columnas del SQL en mayúsculas), ajusta los `name` de los `fields` en cada página
de `src/pages/` para que coincidan.

## Próximos pasos sugeridos

- Autenticación (login) si tu backend lo requiere.
- Paginación del lado del servidor si las tablas crecen mucho.
- Página de "pagos pendientes por persona" cruzando `cuentas_asociadas` + `pagos` + `estados_pago`.
