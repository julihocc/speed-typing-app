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
  setCapturedChars: (captured: string[]) => void,
  setCapturedWords: (captured: string[]) => void
) {
  const handleOnChange = () => {
    const value = inputRef.current?.value;
    setTextFieldValue(value);
    // const _captured = value?.trim().split("") || [];
    const _capturedChars = value?.split("") || [];
    setCapturedChars(_capturedChars);
    const _capturedWords = value?.trim().split(" ") || [];
    setCapturedWords(_capturedWords);
  };

  return handleOnChange;
}

export function setHandleOnKeyUp(
  capturedChars: string[],
  chars: string[],
  setNailedChars: (nailed: (boolean | null)[]) => void,
  words: string[],
  capturedWords: string[],
  setNailedWords: (nailed: (boolean | null)[]) => void
) {
  const handleOnKeyUp = () => {
    if (capturedChars.length <= chars.length) {
      const nailedUpdated = capturedChars.map((word, index) => {
        const current = chars[index];
        if (current) {
          return word === current;
        } else {
          return null;
        }
      });
      setNailedChars(nailedUpdated);
    }
    if (capturedWords.length <= words.length) {
      const nailedWordsUpdated = capturedWords.map((word, index) => {
        const currentWord = words[index];
        if (currentWord) {
          return word === currentWord;
        } else {
          return null;
        }
      });
      setNailedWords(nailedWordsUpdated);
    }
  };

  return handleOnKeyUp;
}
