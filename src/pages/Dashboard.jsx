import { useEffect, useState } from "react";
import { Tv, Wallet, Users, Receipt } from "lucide-react";
import plataformaApi from "../api/plataforma";
import cuentaApi from "../api/cuenta";
import personaApi from "../api/persona";
import pagosApi from "../api/pagos";
import Spinner from "../components/ui/Spinner";

const CARDS = [
  {
    key: "plataformas",
    label: "Plataformas activas",
    icon: Tv,
    api: plataformaApi,
  },
  {
    key: "cuentas",
    label: "Cuentas registradas",
    icon: Wallet,
    api: cuentaApi,
  },
  { key: "personas", label: "Personas", icon: Users, api: personaApi },
  { key: "pagos", label: "Pagos registrados", icon: Receipt, api: pagosApi },
];

export default function Dashboard() {
  const [counts, setCounts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all(CARDS.map((c) => c.api.contar().catch(() => [])))
      .then((results) => {
        if (!active) return;
        setCounts(
          Object.fromEntries(
            CARDS.map((c, i) => [c.key, results[i]?.cantidad ?? 0]),
          ),
        );
      })
      .catch(() =>
        setError("No se pudo conectar con el backend en localhost:8080."),
      );
    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Resumen</h1>
      <p className="mt-1 text-sm text-ink/60">
        Vista general de tus cuentas de streaming compartidas.
      </p>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!counts && !error ? (
        <Spinner />
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map(({ key, label, icon: Icon }) => (
            <div
              key={key}
              className="rounded-xl border border-brand-100 bg-white p-5 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-brand-50 p-2 text-brand-600">
                  <Icon size={18} />
                </span>
              </div>
              <p className="mt-4 font-display text-3xl text-navy-950">
                {counts?.[key] ?? "—"}
              </p>
              <p className="mt-1 text-sm text-ink/60">{label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 rounded-xl border border-brand-100 bg-white p-6 shadow-card">
        <h2 className="text-base font-semibold text-navy-950">
          Cómo está organizada la app
        </h2>
        <p className="mt-2 text-sm text-ink/70">
          Cada sección del menú corresponde a una tabla de la base de datos
          PayMeNow: plataformas de streaming, las cuentas que se contratan en
          ellas, las personas asociadas a cada cuenta compartida, y el historial
          de pagos con su estado.
        </p>
      </div>
    </div>
  );
}
