export function setHandleKeyDown(
  gameStartTime: number | null,
  setGameStartTime: (initTime: number | null) => void
) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Backspace") {
      event.preventDefault();
    }
    if (gameStartTime === null) {
      setGameStartTime(new Date().getTime());
    }
  };
  return handleKeyDown;
}

export function setHandleOnChange(
  inputRef: React.RefObject<HTMLInputElement>,
  setTextFieldValue: (value: string | undefined) => void,
  setCaptured: (captured: string[]) => void,
  chars: string[]
) {
  const handleOnChange = () => {
    const value = inputRef.current?.value;
    setTextFieldValue(value);
    const _captured = value?.trim().split("") || [];
    if (_captured.length <= chars.length) {
      setCaptured(_captured);
    }
  };

  return handleOnChange;
}

export function setHandleOnKeyUp(
  captured: string[],
  words: string[],
  setNailed: (nailed: (boolean | null)[]) => void,
  gameEndTime: number | null,
  setGameEndTime: (endTime: number | null) => void
) {
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

  return handleOnKeyUp;
}
