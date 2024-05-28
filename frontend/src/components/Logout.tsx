import { Button } from "@mui/material";
import useBoundStore from "../stores/bound-store";

const Logout = () => {
  const {
    logout,
    // currentUserEmail
  } = useBoundStore();
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
