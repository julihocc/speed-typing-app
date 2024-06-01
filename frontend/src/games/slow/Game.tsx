import { useRef, useState, useEffect } from "react";
import useSessionStore from "../../stores/session-store";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import {
  useFocusInput,
  useSetRandomIndex,
  useSetRandomText,
  useSetChars,
  useTextFieldValue,
  useSetColors,
  useSetColored,
} from "./game.hooks";

import {
  setHandleKeyDown,
  setHandleOnChange,
  setHandleOnKeyUp,
} from "./game.handlers";

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
    charColors,
    setCharColors,
    nailedChars,
    setNailedChars: setNailed,
    capturedChars,
    setCapturedChars,
    randomIndex,
    setRandomIndex,
    backspaceDisabled,
  } = useSessionStore();

  useFocusInput(inputRef);

  useSetRandomIndex(randomIndex, setRandomIndex);

  useSetRandomText(randomIndex, setTextToBeCaptured);

  useSetChars(textToBeCaptured, setChars);

  useTextFieldValue(textFieldValue, inputRef);

  useSetColors(nailedChars, setCharColors);

  // useSetColored(captured, colors, setColored);
  useSetColored(chars, charColors, setColored);

  useEffect(() => {
    if (capturedChars.length > chars.length && chars.length > 0) {
      console.log("Game over");

      if (gameEndTime === null) {
        const now = new Date().getTime();
        setGameEndTime(now);
      }
    }
  }, [capturedChars, chars, gameEndTime, setGameEndTime]);

  const handleKeyDown = setHandleKeyDown(
    gameStartTime,
    setGameStartTime,
    backspaceDisabled
  );

  const handleOnChange = setHandleOnChange(
    inputRef,
    setTextFieldValue,
    setCapturedChars,
    chars
  );

  const handleOnKeyUp = setHandleOnKeyUp(capturedChars, chars, setNailed);

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
