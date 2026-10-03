import rolApi from "../api/rol";
import EntityCrudPage from "../components/crud/EntityCrudPage";

const fields = [
  {
    name: "nombre",
    label: "Rol",
    type: "text",
    required: true,
  },
  {
    name: "descripcion",
    label: "Descripcion del Rol",
    type: "text",
    required: true,
  },
  {
    name: "activo",
    label: "Activo",
    type: "select",
    required: "true",
    options: [
      { value: "S", label: "Activo" },
      { value: "N", label: "Inactivo" },
    ],
  },
];
const columns = [
  {
    key: "nombre",
    header: "Rol",
  },
  {
    key: "descripcion",
    header: "Descripcion",
  },
];
export default function RolesPage() {
  return (
    <>
      <EntityCrudPage
        title="Roles"
        description="Roles para los usuarios de PaymeNow"
        api={rolApi}
        rowKey="idRol"
        columns={columns}
        fields={fields}
        emptyLabel="roles"
      ></EntityCrudPage>
    </>
  );
}
