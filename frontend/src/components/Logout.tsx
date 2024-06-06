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
      className="md:h-12 md:w-24 bg-secondary text-black"
    >
      Logout
    </Button>
  );
};

export default Logout;
