
import { useRef, useEffect, useState } from "react";
import { Text, TextProps, TextField, Flex, Box } from "@radix-ui/themes";
import { useStore } from 'zustand'

type Color = "green" | "red" | undefined;

export default function Game() {
  const inputRef = useRef<HTMLInputElement>(null);

  const text = "This is a paragraph component";

  const words = text.split(" ");

  // const [captured, setCaptured] = useState<string[]>([]);
  const captured = useStore(state => state.captured)
  const setCaptured = useStore(state => state.setCaptured)

  const [nailed, setNailed] = useState<(boolean | null)[]>([]);

  const [colors, setColors] = useState<Color[]>([]);

  const [colored, setColored] = useState<JSX.Element[] | undefined>(undefined);

  const [initTime, setInitTime] = useState<number | null>(null);

  const [endTime, setEndTime] = useState<number | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Backspace") {
      event.preventDefault();
    }
    if (initTime === null) {
      setInitTime(new Date().getTime());
    }
  };

  const handleOnChange = () => {
    const value = inputRef.current?.value;
    const _captured = value?.split(" ") || [];
    if (_captured.length <= words.length) {
      setCaptured(_captured);
    }
  };

  const handleOnKeyUp = () => {
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
      if (endTime === null) {
        const now = new Date().getTime();
        setEndTime(now);
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
  }, [nailed]);

  useEffect(() => {
    console.log(captured);
    console.log(colors);

    if (captured) {
      const _colored = captured.map((word, index) => {
        const color = colors[index];
        return (
          <Text key={`colored-${index}`} color={color as TextProps["color"]}>
            {word}
          </Text>
        );
      });
      setColored(_colored);
    }
  }, [captured, colors]);

  return (
    <Flex direction="column">
      <Text>{text}</Text>
      <TextField.Root
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onChange={handleOnChange}
        onKeyUp={handleOnKeyUp}
      >
        <TextField.Slot />
      </TextField.Root>
      <Flex gapX="2">
        {colored}
      </Flex>
      <Box>Started at {initTime}</Box>
      <Box>End at {endTime}</Box>
    </Flex>
  );
}
