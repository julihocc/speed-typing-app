import { Alert } from "@mui/material";
import useSessionStore from "../stores/session-store";

export default function PasswordError() {
  const { passwordError, setPasswordError } = useSessionStore();

  const handleClose = () => {
    setPasswordError(null);
  };

  return (
    <Alert
      severity="error"
      onClose={handleClose}
    >
      { passwordError }
    </Alert>
  );
}
