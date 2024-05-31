export function setHandleKeyDown(
  gameStartTime: number | null,
  setGameStartTime: (initTime: number | null) => void,
  backspaceDisabled: boolean
) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Backspace" && backspaceDisabled) {
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
  words: string[]
) {
  words;
  const handleOnChange = () => {
    const value = inputRef.current?.value;
    setTextFieldValue(value);
    // const _captured = value?.trim().split("") || [];
    const _captured = value?.split("") || [];
    // if (_captured.length <= words.length) {
    //   setCaptured(_captured);
    // }
    setCaptured(_captured);
  };

  return handleOnChange;
}

export function setHandleOnKeyUp(
  captured: string[],
  words: string[],
  setNailed: (nailed: (boolean | null)[]) => void
) {
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
  };

  return handleOnKeyUp;
}
