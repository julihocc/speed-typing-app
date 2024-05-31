import { useRef, useState, useEffect } from "react";
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
    chars: words,
    setChars: setWords,
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

  useSetWords(textToBeCaptured, setWords);

  useTextFieldValue(textFieldValue, inputRef);

  useSetColors(nailed, setColors);

  useSetColored(captured, colors, setColored);

  useEffect(() => {
    if (captured.length === words.length) {
      console.log("Game over");

      if (gameEndTime === null) {
        const now = new Date().getTime();
        setGameEndTime(now);
      }
    }
  }, [captured, words, gameEndTime, setGameEndTime]);

  // useEffect(() => {
  //   if (gameEndTime !== null) {
  //     resetGame();
  //   }
  // }, [gameEndTime, resetGame]);

  // useEffect(() => {
  //   if (gameEndTime !== null) {
  //     setGameOver(true);
  //   }
  // }, [gameEndTime]);

  // useEffect(() => {
  //   if (gameOver) {
  //     resetGame();
  //     setGameOver(false);
  //   }
  // }, [gameOver, resetGame]);

  const handleKeyDown = setHandleKeyDown(
    gameStartTime,
    setGameStartTime,
    backspaceDisabled
  );

  const handleOnChange = setHandleOnChange(
    inputRef,
    setTextFieldValue,
    setCaptured,
    words
  );

  const handleOnKeyUp = setHandleOnKeyUp(captured, words, setNailed);

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
