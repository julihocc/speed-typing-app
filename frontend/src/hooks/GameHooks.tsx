import { useEffect } from "react";

export const useFocusInput = (inputRef: React.RefObject<HTMLInputElement>) => {
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);
};

export function useSetRandomIndex(
  randomIndex: number | null,
  setRandomIndex: (randomIndex: number | null) => void
) {
  useEffect(() => {
    if (randomIndex === null) {
      setRandomIndex(Math.floor(Math.random() * 71));
    }
  }, [setRandomIndex, randomIndex]);
}

export function useSetRandomText(
  randomIndex: number | null,
  setTextToBeCaptured: React.Dispatch<React.SetStateAction<string>>
) {
  useEffect(() => {
    // const random = Math.floor(Math.random() * 71);
    if (randomIndex === null) {
      return;
    }
    const url = "http://localhost:3000/" + randomIndex;
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        if (data === "Not Found") {
          console.error("Not Found");
          return;
        }
        const obj = JSON.parse(data);
        setTextToBeCaptured(obj.quote);
      });
  }, [randomIndex, setTextToBeCaptured]);
}
