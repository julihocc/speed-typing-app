import { Navigate, Outlet } from "react-router-dom";
import useSessionStore from "../stores/session-store";

const PrivateLayout = () => {
  const { currentUserEmail } = useSessionStore();

  if (!currentUserEmail) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateLayout;
