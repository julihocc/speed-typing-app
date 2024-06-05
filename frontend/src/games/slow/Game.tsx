import { useRef, useState, useEffect } from "react";
import useSessionStore from "../../stores/session-store";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Paper from "@mui/material/Paper";
import { Box, TextField, Paper, CircularProgress } from "@mui/material";
import { gameSelector } from "./game.selector";

import {
  useFocusInput,
  useSetRandomIndex,
  useSetRandomText,
  useSetChars,
  useTextFieldValue,
  useSetColors,
  useSetColored,
  useSetWords,
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
    setNailedChars,
    capturedChars,
    setCapturedChars,
    randomIndex,
    setRandomIndex,
    backspaceDisabled,
    setWords,
    setNailedWords,
    setCapturedWords,
    words,
    capturedWords,
  } = useSessionStore(gameSelector);

  useFocusInput(inputRef);

  useSetRandomIndex(randomIndex, setRandomIndex);

  // useSetRandomText(randomIndex, setTextToBeCaptured);
  // const { data: text } = useSetRandomText(randomIndex);
  const { isLoading } = useSetRandomText(randomIndex, setTextToBeCaptured);

  // useEffect(() => {
  //   if (text) {
  //     setTextToBeCaptured(text);
  //   }
  // }, [text]);

  useSetChars(textToBeCaptured, setChars);

  useSetWords(textToBeCaptured, setWords);

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
    setCapturedWords
  );

  const handleOnKeyUp = setHandleOnKeyUp(
    capturedChars,
    chars,
    setNailedChars,
    words,
    capturedWords,
    setNailedWords
  );

  return (
    <Box className="flex flex-col space-y-4 items-center w-custom">
      {isLoading ? (
        <Box className="justify-normal items-center flex">
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex">
          <Paper>{colored}</Paper>
        </Box>
      )}

      <TextField
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        onChange={handleOnChange}
        onKeyUp={handleOnKeyUp}
        onPaste={(e) => e.preventDefault()}
        className="w-custom"
      />
    </Box>
  );
}
