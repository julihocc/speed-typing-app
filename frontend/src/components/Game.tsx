import { useRef, useEffect, useState } from "react";
import useBoundStore from "../store";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Game() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [colored, setColored] = useState<JSX.Element[] | undefined>(undefined);
  const [textToBeCaptured, setTextToBeCaptured] = useState<string>("");

  const {
    textFieldValue,
    setTextFieldValue,
    words,
    setWords,
    initialTimerValue,
    remainingTime,
    setRemainingTime,
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
  } = useBoundStore();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (randomIndex === null) {
      setRandomIndex(Math.floor(Math.random() * 71));
    }
  }, [setRandomIndex, randomIndex]);

  useEffect(() => {
    // const random = Math.floor(Math.random() * 71);
    const url = "http://localhost:3000/" + randomIndex;
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const obj = JSON.parse(data);
        setTextToBeCaptured(obj.quote);
      });
  }, [randomIndex, setTextToBeCaptured]);

  useEffect(() => {
    setWords(textToBeCaptured.trim().split(" "));
  }, [setWords, textToBeCaptured]);

  useEffect(() => {
    if (textFieldValue === undefined) {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
    if (textFieldValue !== undefined) {
      if (inputRef.current) {
        inputRef.current.value = textFieldValue;
      }
    }
  }, [textFieldValue]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Backspace") {
      event.preventDefault();
    }
    if (gameStartTime === null) {
      setGameStartTime(new Date().getTime());
    }
    if (remainingTime === null) {
      setRemainingTime(initialTimerValue);
    }
  };

  const handleOnChange = () => {
    const value = inputRef.current?.value;
    setTextFieldValue(value);
    const _captured = value?.trim().split(" ") || [];
    if (_captured.length <= words.length) {
      setCaptured(_captured);
    }
  };

  const handleOnKeyUp = (event: React.KeyboardEvent) => {
    if (captured.length <= words.length) {
      const nailedUpdated = captured.map((word, index) => {
        const current = words[index];
        if (current) {
          return word === current;
        } else {
          return null;
        }
      });
      setNailed(nailedUpdated);
    }
    if (captured.length === words.length) {
      console.log("Game over");
      console.log(`event.key: ${event.key}`);
      if (event.key === " ") {
        if (gameEndTime === null) {
          const now = new Date().getTime();
          setGameEndTime(now);
        }
      }
    }
  };

  useEffect(() => {
    const colorsUpdated = nailed.map((ok) => {
      if (ok === true) {
        return "green";
      }
      if (ok === false) {
        return "red";
      }
      if (ok === null) {
        return undefined;
      }
    });

    setColors(colorsUpdated);
  }, [nailed, setColors]);

  useEffect(() => {
    if (captured) {
      const _colored = captured.map((word, index) => {
        const color = colors[index];
        return (
          // <Text key={`colored-${index}`} color={color as TextProps["color"]}>
          //   {word}
          // </Text>
          <Typography key={`colored-${index}`} style={{ color: color }}>
            {word}
          </Typography>
        );
      });
      // console.log(`_colored: ${JSON.stringify(_colored, null, 2)}`);
      setColored(_colored);
    }
  }, [captured, colors, setColored]);

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Typography>{textToBeCaptured}</Typography>
      <TextField
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        onChange={handleOnChange}
        onKeyUp={handleOnKeyUp}
        onPaste={(e) => e.preventDefault()}
      />
      <Box display="flex" gap={2}>
        {colored}
      </Box>
      {gameStartTime && <Box>Started at {gameStartTime}</Box>}
      {gameEndTime && <Box>End at {gameEndTime}</Box>}
      {gameStartTime && gameEndTime && (
        <Box>Time taken: {gameEndTime - gameStartTime} ms</Box>
      )}
    </Box>
  );
}
