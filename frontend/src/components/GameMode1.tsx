import { useRef, useState } from "react";
import useSessionStore from "../stores/session-store";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import {
  useFocusInput,
  useSetRandomIndex,
  useSetRandomText,
  useSetWords,
  useTextFieldValue,
  useSetColors,
  useSetColored,
} from "../hooks/GameHooks";

import {
  setHandleKeyDown,
  setHandleOnChange,
  setHandleOnKeyUp,
} from "../handlers/GameHandlers";

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

  useFocusInput(inputRef);

  useSetRandomIndex(randomIndex, setRandomIndex);

  useSetRandomText(randomIndex, setTextToBeCaptured);

  useSetWords(textToBeCaptured, setWords);

  useTextFieldValue(textFieldValue, inputRef);

  const handleKeyDown = setHandleKeyDown(gameStartTime, setGameStartTime);

  const handleOnChange = setHandleOnChange(
    inputRef,
    setTextFieldValue,
    setCaptured,
    words
  );

  // const handleOnKeyUp = (event: React.KeyboardEvent) => {
  //   if (captured.length <= words.length) {
  //     const nailedUpdated = captured.map((word, index) => {
  //       const current = words[index];
  //       if (current) {
  //         return word === current;
  //       } else {
  //         return null;
  //       }
  //     });
  //     setNailed(nailedUpdated);
  //   }
  //   if (captured.length === words.length) {
  //     console.log("Game over");
  //     console.log(`event.key: ${event.key}`);
  //     if (event.key === " ") {
  //       if (gameEndTime === null) {
  //         const now = new Date().getTime();
  //         setGameEndTime(now);
  //       }
  //     }
  //   }
  // };
  const handleOnKeyUp = setHandleOnKeyUp(
    captured,
    words,
    setNailed,
    gameEndTime,
    setGameEndTime
  );

  useSetColors(nailed, setColors);

  useSetColored(captured, colors, setColored);

  return (
    <Box display="flex" flexDirection="column" gap={4}>
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
