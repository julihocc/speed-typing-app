import useBoundStore from "../stores/bound-store";
import { Button } from "@mui/material";
import useIndexedStore from "../stores/indexed-store";

export default function ResetMatchRecords() {
  // const resetMatchRecords = useBoundStore((state) => state.resetMatchRecords);
  const { currentUser } = useBoundStore();
  const { resetMatchRecords } = useIndexedStore();

  const handleOnClick = () => {
    console.log("Resetting match records");
    if (!currentUser) {
      console.error("No user found");
      return;
    }
    console.log(currentUser.email);
    resetMatchRecords(currentUser.email);
  };

  return (
    <Button variant="outlined" onClick={handleOnClick}>
      Reset Match Records
    </Button>
  );
}
