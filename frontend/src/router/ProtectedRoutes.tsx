import { Navigate, Outlet } from "react-router-dom";
import useSessionStore from "../stores/session-store";

const ProtectedRoutes = () => {
  const { currentUserEmail } = useSessionStore();

  if (!currentUserEmail) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
