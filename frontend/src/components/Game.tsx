import { useRef, useEffect, useState } from "react";
import { Text, TextProps, TextField, Flex, Box } from "@radix-ui/themes";
import useBoundStore from "../store";

// type Color = "green" | "red" | undefined;

export default function Game() {
  const inputRef = useRef<HTMLInputElement>(null);

  const text = "This is a paragraph component";

  const words = text.split(" ");

  const captured = useBoundStore((state) => state.captured);
  const setCaptured = useBoundStore((state) => state.setCaptured);

  const nailed = useBoundStore((state) => state.nailed);
  const setNailed = useBoundStore((state) => state.setNailed);

  const colors = useBoundStore((state) => state.colors);
  const setColors = useBoundStore((state) => state.setColors);

  const [colored, setColored] = useState<JSX.Element[] | undefined>(undefined);

  const initTime = useBoundStore((state) => state.gameStartTime);
  const setInitTime = useBoundStore((state) => state.setGameStartTime);

  const endTime = useBoundStore((state) => state.gameEndTime);
  const setEndTime = useBoundStore((state) => state.setGameEndTime);

  const resetGame = useBoundStore((state) => state.resetGame);

  const resetTimer = useBoundStore((state) => state.resetTimer);

  const initialTimerValue = useBoundStore((state) => state.initialTimerValue);
  const remainingTime = useBoundStore((state) => state.remainingTime);
  const setRemainingTime = useBoundStore((state) => state.setRemainingTime);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const value = inputRef.current?.value;
    console.log(`inputRef.current.value: ${value}`);
    if (!value) {
      resetGame();
      resetTimer();
    }
  }, [inputRef.current?.value, resetGame, resetTimer]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Backspace") {
      event.preventDefault();
    }
    if (initTime === null) {
      setInitTime(new Date().getTime());
    }
    if (remainingTime === null) {
      setRemainingTime(initialTimerValue);
    }
  };

  const handleOnChange = () => {
    const value = inputRef.current?.value;
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
        if (endTime === null) {
          const now = new Date().getTime();
          setEndTime(now);
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
    // console.log(captured);
    // console.log(colors);

    if (captured) {
      const _colored = captured.map((word, index) => {
        const color = colors[index];
        return (
          <Text key={`colored-${index}`} color={color as TextProps["color"]}>
            {word}
          </Text>
        );
      });
      // console.log(`_colored: ${JSON.stringify(_colored, null, 2)}`);
      setColored(_colored);
    }
  }, [captured, colors, setColored]);

  return (
    <Flex direction="column" gap="4">
      <Text>{text}</Text>
      <TextField.Root
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onChange={handleOnChange}
        onKeyUp={handleOnKeyUp}
        onPaste={(e) => e.preventDefault()}
      >
        <TextField.Slot />
      </TextField.Root>
      <Flex gapX="2">{colored}</Flex>
      {initTime && <Box>Started at {initTime}</Box>}
      {endTime && <Box>End at {endTime}</Box>}
      {initTime && endTime && <Box>Time taken: {endTime - initTime} ms</Box>}
    </Flex>
  );
}
