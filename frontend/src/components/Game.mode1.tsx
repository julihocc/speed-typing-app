import { useRef, useState, useEffect } from "react";
import useSessionStore from "../stores/session-store";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import {
  useFocusInput,
  useSetRandomIndex,
  useSetRandomText,
  useSetWords,
  useTextFieldValue,
  useSetColors,
  useSetColored,
} from "../hooks/game.hooks.mode1";

import {
  setHandleKeyDown,
  setHandleOnChange,
  setHandleOnKeyUp,
} from "../handlers/game.handlers.mode1";

export default function Game() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [colored, setColored] = useState<JSX.Element[] | undefined>(undefined);
  const [textToBeCaptured, setTextToBeCaptured] = useState<string>("");

  const {
    textFieldValue,
    setTextFieldValue,
    chars,
    setChars,
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
    backspaceDisabled,
  } = useSessionStore();

  useFocusInput(inputRef);

  useSetRandomIndex(randomIndex, setRandomIndex);

  useSetRandomText(randomIndex, setTextToBeCaptured);

  useSetWords(textToBeCaptured, setChars);

  useTextFieldValue(textFieldValue, inputRef);

  useSetColors(nailed, setColors);

  // useSetColored(captured, colors, setColored);
  useSetColored(chars, colors, setColored);

  useEffect(() => {
    if (captured.length >= chars.length) {
      console.log("Game over");

      if (gameEndTime === null) {
        const now = new Date().getTime();
        setGameEndTime(now);
      }
    }
  }, [captured, chars, gameEndTime, setGameEndTime]);

  const handleKeyDown = setHandleKeyDown(
    gameStartTime,
    setGameStartTime,
    backspaceDisabled
  );

  const handleOnChange = setHandleOnChange(
    inputRef,
    setTextFieldValue,
    setCaptured,
    chars
  );

  const handleOnKeyUp = setHandleOnKeyUp(captured, chars, setNailed);

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex">
        <Paper>{colored}</Paper>
      </Box>
      <TextField
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        onChange={handleOnChange}
        onKeyUp={handleOnKeyUp}
        onPaste={(e) => e.preventDefault()}
      />
    </Box>
  );
}
