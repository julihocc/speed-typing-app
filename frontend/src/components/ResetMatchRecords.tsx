import useSessionStore from "../stores/session-store";
import { Button } from "@mui/material";
import useIndexedStore from "../stores/indexed-store";

export default function ResetMatchRecords() {
  // const resetMatchRecords = useBoundStore((state) => state.resetMatchRecords);
  const { currentUserEmail } = useSessionStore();
  const { resetMatchRecords, getUserByEmail } = useIndexedStore();

  const currentUser = getUserByEmail(currentUserEmail);

  const handleOnClick = () => {
    console.log("Resetting match records");
    if (!currentUser) {
      console.error("No user found");
      return;
    }
    console.log("...for ", currentUser.email);
    resetMatchRecords(currentUser.email);
  };

  return (
    <Button variant="outlined" onClick={handleOnClick}>
      Reset Match Records
    </Button>
  );
}
