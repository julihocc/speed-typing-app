// import { z } from "zod";
// import { TextField } from "@mui/material";
// import useSessionStore from "../stores/session-store";
// import { useState } from "react";

// const timerValueSchema = z.number().min(0).max(3600); // 0-3600 seconds (1 hour)

// export default function SetInitialTime() {
//   const { initialTimerValue, setInitialTimerValue } = useSessionStore();
//   const [error, setError] = useState<z.ZodError | null>(null);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const parsedValue = timerValueSchema.safeParse(Number(e.target.value));
//     if (parsedValue.success) {
//       setInitialTimerValue(parsedValue.data);
//       setError(null);
//     } else {
//       setError(parsedValue.error);
//     }
//   };

//   return (
//     <TextField
//       type="number"
//       value={initialTimerValue}
//       onChange={handleInputChange}
//       sx={{ width: "20rem" }}
//       label="Initial Time (seconds)"
//       error={!!error} // Show error state if validation fails
//       helperText={error?.message} // Display error message
//     />
//   );
// }

import { z } from "zod";
import { TextField, FormHelperText } from "@mui/material";
import useSessionStore from "../stores/session-store";
import { useState } from "react";

const timerValueSchema = z.number().min(0).max(3600);

export default function SetInitialTime() {
  const { initialTimerValue, setInitialTimerValue } = useSessionStore();
  const [error, setError] = useState<z.ZodError | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = timerValueSchema.safeParse(Number(e.target.value));
    if (parsedValue.success) {
      setInitialTimerValue(parsedValue.data);
      setError(null);
    } else {
      setError(parsedValue.error);
    }
  };

  const getFriendlyErrorMessage = (error: z.ZodError | null) => {
    if (!error) return null;

    const firstIssue = error.issues[0]; // Get the first validation issue
    switch (firstIssue.code) {
      case "too_small":
        return "Initial time must be at least 0 seconds.";
      case "too_big":
        return "Initial time cannot exceed 3600 seconds (1 hour).";
      case "invalid_type":
        return "Please enter a valid number.";
      default:
        return "Invalid initial time.";
    }
  };

  return (
    <>
      <TextField
        type="number"
        value={initialTimerValue}
        onChange={handleInputChange}
        sx={{ width: "20rem" }}
        label="Initial Time (seconds)"
      />
      {error && ( // Show error message only when there's an error
        <FormHelperText error>{getFriendlyErrorMessage(error)}</FormHelperText>
      )}
    </>
  );
}
