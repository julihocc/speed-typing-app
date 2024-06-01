import { useRef, useState, useEffect } from "react";
import useSessionStore from "../../stores/session-store";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import SetInitialTime from "../../components/SetInitialTime";

import { useFocusInput, useSetCharColors, useSetColored } from "./game.hooks";

import {
  setHandleKeyDown,
  setHandleOnChange,
  setHandleOnKeyUp,
} from "./game.handlers";

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
    charColors,
    setCharColors,
    nailedChars,
    setNailedChars,
    capturedChars,
    setCapturedChars,
    randomIndex,
    setRandomIndex,
    remainingTime,
    setRemainingTime,
    initialTimerValue,
    backspaceDisabled,
    setBackspaceDisabled,
    words,
    capturedWords,
    setCapturedWords,
    setNailedWords,
  } = useSessionStore();

  useFocusInput(inputRef);

  useEffect(() => {
    setBackspaceDisabled(true);
  }, [setBackspaceDisabled]);

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
      const startIndex = capturedChars.length;
      // setTextToBeShown(textToBeCaptured.substring(startIndex, startIndex + 20));
      setTextToBeShown(textToBeCaptured.substring(startIndex));
    }
  }, [textToBeCaptured, setTextToBeShown, capturedChars]);

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
  }, [textFieldValue, inputRef, capturedChars]);

  useSetCharColors(nailedChars, setCharColors);

  useSetColored(capturedChars, charColors, setColored);

  const handleKeyDown = setHandleKeyDown(
    gameStartTime,
    setGameStartTime,
    remainingTime,
    setRemainingTime,
    initialTimerValue,
    backspaceDisabled
  );

  const handleOnChange = setHandleOnChange(
    inputRef,
    setTextFieldValue,
    setCapturedChars,
    chars,
    words,
    setCapturedWords
  );

  const handleOnKeyUp = setHandleOnKeyUp(
    capturedChars,
    chars,
    setNailedChars,
    gameEndTime,
    setGameEndTime,
    words,
    capturedWords,
    setNailedWords
  );

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box sx={{ margin: 2 }}>
        <SetInitialTime />
      </Box>
      <Box sx={{ margin: 2 }}>
        {/* TODO Improve the design of the text to be shown */}
        <TextField
          disabled
          value={textToBeShown}
          InputProps={{
            readOnly: true,
            disableUnderline: true,
            inputProps: { sx: { color: "black" } },
          }}
          sx={{
            width: "100%",
          }}
        />
      </Box>

      <TextField
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        onChange={handleOnChange}
        onKeyUp={handleOnKeyUp}
      />
      <Box display="flex">
        <Paper>{colored}</Paper>
      </Box>
    </Box>
  );
}
