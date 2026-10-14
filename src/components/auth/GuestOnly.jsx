import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import Spinner from "../ui/Spinner";

export default function GuestOnly() {
  const { user, loading } = useAuth();
  if (loading) {
    return <Spinner label="Verificando sesión..." />;
  }
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
