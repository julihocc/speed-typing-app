import { Navigate, Outlet } from "react-router-dom";
import useBoundStore from "../stores/bound-store";

const PrivateLayout = () => {
  const { currentUserEmail } = useBoundStore();

  if (!currentUserEmail) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateLayout;
