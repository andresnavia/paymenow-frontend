import personaApi from "../api/persona";
import rolApi from "../api/rol";
import usuarioApi from "../api/usuarioApi";
import EntityCrudPage from "../components/crud/EntityCrudPage";

const fields = [
  {
    name: "idPers",
    label: "Persona",
    type: "select",
    required: true,
    optionsSource: {
      api: personaApi,
      valueKey: "idPers",
      getLabel: (item) => item.identificacion + " - " + item.primerNombre,
    },
  },
  {
    name: "idRol",
    label: "Rol del Usuario",
    type: "select",
    required: true,
    optionsSource: {
      api: rolApi,
      valueKey: "idRol",
      getLabel: (item) => item.nombre,
    },
  },
  {
    name: "idFirebase",
    label: "Id de la Plataforma de firebase",
    type: "text",
    required: true,
  },
];
const columns = [
  { key: "idUsua", header: "ID" },
  { key: "persona", header: "Persona" },
  { key: "rol", header: "Rol" },
  { key: "activo", header: "Activo" },
];

export default function UsuariosPage() {
  return (
    <>
      <EntityCrudPage
        title="Usuarios"
        description="Usuarios registrados en la aplicación PaymeNow"
        api={usuarioApi}
        rowKey="idUsua"
        columns={columns}
        fields={fields}
        emptyLabel="usuarios"
      ></EntityCrudPage>
    </>
  );
}
