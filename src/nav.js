import {
  LayoutDashboard,
  IdCard,
  Users,
  Tv,
  Wallet,
  UsersRound,
  ListChecks,
  Receipt,
  SlidersHorizontal,
  ShieldCheck,
  UserCog,
} from "lucide-react";

export const NAV_ITEMS = [
  { to: "/", label: "Resumen", icon: LayoutDashboard, end: true },
  { to: "/plataformas", label: "Plataformas", icon: Tv },
  { to: "/cuentas", label: "Cuentas", icon: Wallet },
  { to: "/cuentas-asociadas", label: "Cuentas asociadas", icon: UsersRound },
  { to: "/personas", label: "Personas", icon: Users },
  { to: "/pagos", label: "Pagos", icon: Receipt },
  { to: "/estados-pago", label: "Estados de pago", icon: ListChecks },
  {
    to: "/tipos-identificacion",
    label: "Tipos de identificación",
    icon: IdCard,
  },
  { to: "/parametros", label: "Parámetros", icon: SlidersHorizontal },
  { to: "/roles", label: "Roles", icon: ShieldCheck },
  { to: "/usuarios", label: "Usuarios", icon: UserCog },
];
