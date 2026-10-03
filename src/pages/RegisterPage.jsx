import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { Waves } from "lucide-react";
import Button from "../components/ui/Button";
import tiposIdentificacionApi from "../api/tiposIdentificacion";
import Field from "../components/ui/Field";
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
const emptyFormFrom = (fields) =>
  fields.reduce((acc, f) => ({ ...acc, [f.name]: f.defaultValue ?? "" }), {});
export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [optionsMap, setOptionsMap] = useState({});
  const [form, setForm] = useState(() => emptyFormFrom(fields));

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const fieldsWithOptions = useMemo(
    () =>
      fields.map((f) =>
        f.type === "select" && f.optionsSource
          ? { ...f, options: optionsMap[f.name] ?? [] }
          : f,
      ),
    [optionsMap],
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-card">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-white">
            <Waves size={20} />
          </div>
          <h1 className="font-display text-xl text-navy-950">PayMeNow</h1>
          <p className="mt-1 text-sm text-ink/60">Registro de personas</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fieldsWithOptions.map((f) => (
              <div key={f.name} className={f.fullWidth ? "sm:col-span-2" : ""}>
                <Field field={f} value={form[f.name]} onChange={handleChange} />
              </div>
            ))}
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" className="w-full justify-center">
            Registrar
          </Button>
        </form>
        <div>
          <Link to="/login">¿Ya tienes Cuenta? Inicia Sesion</Link>
        </div>
      </div>
    </div>
  );
}
