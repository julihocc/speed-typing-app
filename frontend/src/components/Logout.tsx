import { Button } from "@mui/material";
import useSessionStore from "../stores/session-store";

const Logout = () => {
  const {
    logout,
    // currentUserEmail
  } = useSessionStore();
  // const { resetMatchRecords } = useIndexedStore();
  return (
    <Button
      onClick={() => {
        logout();
        // resetMatchRecords(currentUserEmail);
      }}
    >
      Logout
    </Button>
  );
};

export default Logout;
