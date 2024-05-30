import { Button } from "@mui/material";
import useSessionStore from "../stores/session-store";

export default function DisableBackspace() {
  const { backspaceDisabled, setBackspaceDisabled } = useSessionStore();

  const handleClick = () => {
    setBackspaceDisabled(!backspaceDisabled);
  };

  return (
    <div>
      <Button onClick={handleClick} variant="contained" color="secondary">
        {backspaceDisabled ? "Enable" : "Disable"} Backspace
      </Button>
    </div>
  );
}
