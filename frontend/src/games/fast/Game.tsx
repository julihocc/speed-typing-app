import { useRef, useState, useEffect } from "react";
import useSessionStore from "../../stores/session-store";
import TextField from "@mui/material/TextField";
import SetInitialTime from "../../components/SetInitialTime";
import Timer from "../../components/Timer";
import Timer2 from "../../components/Timer2";
import {
  Box,
  Paper,
  Switch,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import useSWR from "swr";

import { useFocusInput, useSetCharColors, useSetColored } from "./game.hooks";
import { gameSelector } from "./game.selector";

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
  const [timerMode, setTimerMode] = useState<"1" | "2">("1");

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
    setWords,
    setCapturedWords,
    setNailedWords,
  } = useSessionStore(gameSelector);

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

  const fetcher = (url: string) =>
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

  const { isLoading } = useSWR(`http://localhost:3001/${randomIndex}`, fetcher);

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
    setChars(textToBeCaptured.split(""));
  }, [setChars, textToBeCaptured]);

  // useSetWords
  useEffect(() => {
    setWords(textToBeCaptured.trim().split(" "));
  }, [setWords, textToBeCaptured]);

  useEffect(() => {
    if (inputRef.current) {
      if (textFieldValue === undefined) {
        inputRef.current.value = "";
      } else {
        inputRef.current.value = textFieldValue;
      }
    }
  }, [textFieldValue, inputRef]);

  useSetCharColors(nailedChars, setCharColors);

  useSetColored(capturedChars, charColors, setColored);

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
    remainingTime,
    setRemainingTime,
    initialTimerValue,
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
    <Box display="flex" flexDirection="column" gap={4} alignItems="center">
      <Box sx={{ margin: 2 }} display="flex" gap={2} alignItems="center">
        <Box>
          <SetInitialTime />
        </Box>
        <Box>
          {
            {
              "1": <Timer />,
              "2": <Timer2 />,
            }[timerMode]
          }
        </Box>
      </Box>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        // <Box sx={{ width: "50rem", margin: 2 }}>
        <Box className="w-[50rem] m-2">
          <TextField
            disabled
            value={textToBeShown}
            InputProps={{
              // readOnly: true,
              inputProps: { sx: { color: "black" } },
            }}
            fullWidth
          />
        </Box>
      )}

      <Box sx={{ width: "50rem", margin: 2 }}>
        <TextField
          inputRef={inputRef}
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
          onKeyUp={handleOnKeyUp}
          fullWidth
        />
      </Box>
      <Box display="flex">
        <Paper>{colored}</Paper>
      </Box>
      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={timerMode === "1"}
              onChange={(e) => {
                setTimerMode(e.target.checked ? "1" : "2");
              }}
            />
          }
          label="Select your timer mode"
        />
      </Box>
    </Box>
  );
}
