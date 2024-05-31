// modified
export function setHandleKeyDown(
  gameStartTime: number | null,
  setGameStartTime: (initTime: number | null) => void,
  remainingTime: number | null,
  setRemainingTime: (remainingTime: number | null) => void,
  initialTimerValue: number,
  backspaceDisabled: boolean
) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Backspace" && backspaceDisabled) {
      event.preventDefault();
    }
    if (gameStartTime === null) {
      setGameStartTime(new Date().getTime());
    }
    // this has been added
    if (remainingTime === null) {
      setRemainingTime(initialTimerValue);
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
    const _captured = value?.split("") || [];
    if (_captured.length <= chars.length) {
      setCaptured(_captured);
    }
  };

  return handleOnChange;
}

export function setHandleOnKeyUp(
  captured: string[],
  chars: string[],
  setNailed: (nailed: (boolean | null)[]) => void,
  gameEndTime: number | null,
  setGameEndTime: (endTime: number | null) => void
) {
  const handleOnKeyUp = (event: React.KeyboardEvent) => {
    if (captured.length <= chars.length) {
      const nailedUpdated = captured.map((char, index) => {
        const current = chars[index];
        if (current) {
          return char === current;
        } else {
          return null;
        }
      });
      setNailed(nailedUpdated);
    }
    if (captured.length > chars.length && chars.length>0) {
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
