import { useRef, useState, useEffect } from "react";
import useSessionStore from "../stores/session-store";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Timer from "./Timer";
import SetInitialTime from "./SetInitialTime";

import {
  useFocusInput,
  useSetColors,
  useSetColored,
} from "../hooks/game.hooks.mode2";

import {
  setHandleKeyDown,
  setHandleOnChange,
  setHandleOnKeyUp,
} from "../handlers/game.handlers.mode2";

export default function Game() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [colored, setColored] = useState<JSX.Element[] | undefined>(undefined);
  const [textToBeCaptured, setTextToBeCaptured] = useState<string>("");
  const [listOfWords, setListOfWords] = useState<string[]>([]);
  const [textToBeShown, setTextToBeShown] = useState<string>("");

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
    remainingTime,
    setRemainingTime,
    initialTimerValue,
  } = useSessionStore();

  useFocusInput(inputRef);

  // useSetRandomIndex
  useEffect(() => {
    if (randomIndex === null) {
      setRandomIndex(Math.floor(Math.random() * 2));
    }
  }, [setRandomIndex, randomIndex]);

  useEffect(() => {
    if (randomIndex === null) {
      return;
    }
    const url = "http://localhost:3001/" + randomIndex;
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        if (data === "Not Found") {
          console.error("Not Found");
          return;
        }
        const obj = JSON.parse(data);
        const randomWords = obj.randomWords;
        console.log(`randomWords: ${randomWords}`);
        setListOfWords(randomWords);
      });
  }, [randomIndex, setListOfWords]);

  useEffect(() => {
    if (listOfWords.length > 0) {
      setTextToBeCaptured(listOfWords.join(" "));
    }
  }, [listOfWords, setTextToBeCaptured]);

  useEffect(() => {
    if (textToBeCaptured.length > 0) {
      const startIndex = captured.length;
      setTextToBeShown(textToBeCaptured.substring(startIndex, startIndex + 20));
    }
  }, [textToBeCaptured, setTextToBeShown, captured.length]);

  // useSetChars
  useEffect(() => {
    setChars(textToBeCaptured.trim().split(""));
  }, [setChars, textToBeCaptured]);

  useEffect(() => {
    if (inputRef.current) {
      if (textFieldValue === undefined) {
        inputRef.current.value = "";
      } else {
        inputRef.current.value = textFieldValue;
      }
    }
  }, [textFieldValue, inputRef, captured]);

  useSetColors(nailed, setColors);

  useSetColored(captured, colors, setColored);

  const handleKeyDown = setHandleKeyDown(
    gameStartTime,
    setGameStartTime,
    remainingTime,
    setRemainingTime,
    initialTimerValue
  );

  const handleOnChange = setHandleOnChange(
    inputRef,
    setTextFieldValue,
    setCaptured,
    chars
  );

  const handleOnKeyUp = setHandleOnKeyUp(
    captured,
    chars,
    setNailed,
    gameEndTime,
    setGameEndTime
  );

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box sx={{ margin: 2 }}>
        <SetInitialTime />
      </Box>
      <Box sx={{ margin: 2 }}>
        <Paper variant="outlined">
          <Typography variant="h5" sx={{ margin: 2, padding: 2 }}>
            {textToBeShown}
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
      <Timer />
    </Box>
  );
}