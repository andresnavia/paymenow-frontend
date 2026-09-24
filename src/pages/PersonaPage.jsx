import EntityCrudPage from "../components/crud/EntityCrudPage";
import personaApi from "../api/persona";
import tiposIdentificacionApi from "../api/tiposIdentificacion";
import Button from "../components/ui/Button";
import { useState } from "react";

const fields = [
  {
    name: "primerNombre",
    label: "Primer nombre",
    type: "text",
    required: true,
  },
  { name: "segundoNombre", label: "Segundo nombre", type: "text" },
  {
    name: "primerApellido",
    label: "Primer apellido",
    type: "text",
    required: true,
  },
  { name: "segundoApellido", label: "Segundo apellido", type: "text" },
  {
    name: "sexo",
    label: "Sexo",
    type: "select",
    required: true,
    options: [
      { value: "M", label: "Masculino" },
      { value: "F", label: "Femenino" },
    ],
  },
  { name: "fechaNacimiento", label: "Fecha de nacimiento", type: "date" },
  {
    name: "idTiid",
    label: "Tipo de identificación",
    type: "select",
    required: true,
    optionsSource: {
      api: tiposIdentificacionApi,
      valueKey: "idTiid",
      getLabel: (item) => item.abreviatura,
    },
  },
  {
    name: "identificacion",
    label: "Número de identificación",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Correo electrónico",
    type: "email",
    required: true,
    fullWidth: true,
  },
];

const columns = [
  { key: "abreviatura", header: "Abreviatura" },
  { key: "identificacion", header: "Identificación" },
  {
    key: "nombre",
    header: "Nombre completo",
    render: (row) =>
      [
        row.primerNombre,
        row.segundoNombre,
        row.primerApellido,
        row.segundoApellido,
      ]
        .filter(Boolean)
        .join(" "),
  },
];

export default function PersonaPage() {
  const [queryIdentificacion, setQueryIdentificacion] = useState("");
  const [queryBorrador, setQueryBorrador] = useState("");
  const resetQuery = () => {
    setQueryIdentificacion("");
    setQueryBorrador("");
  };
  return (
    <EntityCrudPage
      title="Personas"
      description="Personas que participan en las cuentas compartidas, como titulares o usuarios asociados."
      api={personaApi}
      rowKey="idPers"
      columns={columns}
      fields={fields}
      emptyLabel="personas"
      paginated
      pageSizeOptions={[10, 20, 50]}
      queryIdentificacion={queryIdentificacion}
      onResetQuery={resetQuery}
    >
      <ToolbarConsulta
        setQueryIdentificacion={setQueryIdentificacion}
        queryBorrador={queryBorrador}
        setQueryBorrador={setQueryBorrador}
      ></ToolbarConsulta>
    </EntityCrudPage>
  );
}

function ToolbarConsulta({
  setQueryIdentificacion,
  queryBorrador,
  setQueryBorrador,
}) {
  const handleChange = (e) => {
    setQueryBorrador(e.target.value);
  };
  const handleClick = () => {
    setQueryIdentificacion(queryBorrador);
  };
  return (
    <>
      <input
        className="input-field"
        placeholder="Campo para consulta"
        value={queryBorrador}
        onChange={(e) => {
          handleChange(e);
        }}
      ></input>
      <Button onClick={handleClick}>Consultar</Button>
    </>
  );
}
