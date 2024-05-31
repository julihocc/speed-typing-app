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
  setCapturedChars: (captured: string[]) => void,
  chars: string[]
) {
  const handleOnChange = () => {
    const value = inputRef.current?.value;
    setTextFieldValue(value);
    const _capturedChars = value?.split("") || [];
    if (_capturedChars.length <= chars.length) {
      setCapturedChars(_capturedChars);
    }
  };

  return handleOnChange;
}

export function setHandleOnKeyUp(
  capturedChars: string[],
  chars: string[],
  setNailedChars: (nailed: (boolean | null)[]) => void,
  gameEndTime: number | null,
  setGameEndTime: (endTime: number | null) => void
) {
  const handleOnKeyUp = (event: React.KeyboardEvent) => {
    if (capturedChars.length <= chars.length) {
      const nailedCharsUpdated = capturedChars.map((char, index) => {
        const currentChar = chars[index];
        if (currentChar) {
          return char === currentChar;
        } else {
          return null;
        }
      });
      setNailedChars(nailedCharsUpdated);
    }
    if (capturedChars.length > chars.length && chars.length>0) {
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
