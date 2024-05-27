import { Button } from "@mui/material";
import useBoundStore from "../stores/bound-store";

const Logout = () => {
  const { logout, resetMatchRecords } = useBoundStore();
  return (
    <Button
      onClick={() => {
        logout();
        resetMatchRecords();
      }}
    >
      Logout
    </Button>
  );
};

export default Logout;
