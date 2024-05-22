import useBoundStore from "../store";
import { Button } from "@radix-ui/themes";

export default function ResetMatchRecords() {
  const resetMatchRecords = useBoundStore((state) => state.resetMatchRecords);

  return <Button onClick={resetMatchRecords}>Reset match records</Button>;
}
