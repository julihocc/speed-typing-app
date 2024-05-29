import { useRef, useState } from "react";
import useSessionStore from "../stores/session-store";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// import {
//   useFocusInput,
//   useSetRandomIndex,
//   useSetRandomText,
//   useSetWords,
//   useTextFieldValue,
//   useSetColors,
//   useSetColored,
// } from "../hooks/game.hooks.mode2";

// import {
//   setHandleKeyDown,
//   setHandleOnChange,
//   setHandleOnKeyUp,
// } from "../handlers/game.handlers.mode2";

export default function Game() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [colored, setColored] = useState<JSX.Element[] | undefined>(undefined);
  const [textToBeCaptured, setTextToBeCaptured] = useState<string>("");

  const {
    textFieldValue,
    setTextFieldValue,
    words,
    setWords,
    gameEndTime,
    setGameEndTime,
    gameStartTime,
    setGameStartTime,
    colors,
    setColors,
    nailed,
    setNailed,
    captured,
    setCaptured,
    randomIndex,
    setRandomIndex,
  } = useSessionStore();

  
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Typography variant="h4">Mode 2</Typography>
      <Box sx={{ margin: 2 }}>
        <Paper variant="outlined">
          <Typography variant="h5" sx={{ margin: 2, padding: 2 }}>
            {textToBeCaptured}
          </Typography>
        </Paper>
      </Box>

      <TextField
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        onChange={handleOnChange}
        onKeyUp={handleOnKeyUp}
        onPaste={(e) => e.preventDefault()}
      />
      <Box display="flex">
        <Paper>{colored}</Paper>
      </Box>
    </Box>
  );
}
