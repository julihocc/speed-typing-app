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
  words: string[]
) {
  const handleOnChange = () => {
    const value = inputRef.current?.value;
    setTextFieldValue(value);
    const _captured = value?.trim().split("") || [];
    if (_captured.length <= words.length) {
      setCaptured(_captured);
    }
  };

  return handleOnChange;
}
