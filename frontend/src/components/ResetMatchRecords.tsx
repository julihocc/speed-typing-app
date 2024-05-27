import useBoundStore from "../../stores/bound-store";
import { Button } from "@mui/material";

export default function ResetMatchRecords() {
  const resetMatchRecords = useBoundStore((state) => state.resetMatchRecords);

  return (
    <Button variant="outlined" onClick={resetMatchRecords}>
      Reset Match Records
    </Button>
  );
}
