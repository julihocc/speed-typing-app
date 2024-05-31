import { useEffect } from "react";
import Typography from "@mui/material/Typography";

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

export function useSetWords(
  textToBeCaptured: string,
  setWords: (text: string[]) => void
) {
  useEffect(() => {
    setWords(textToBeCaptured.trim().split(""));
  }, [setWords, textToBeCaptured]);
}

export function useTextFieldValue(
  textFieldValue: string | undefined,
  inputRef: React.RefObject<HTMLInputElement>
) {
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
  }, [textFieldValue, inputRef]);
}

export function useSetColors(
  nailed: (boolean | null)[],
  setColors: (colors: Color[]) => void
) {
  useEffect(() => {
    const colorsUpdated = nailed.map((ok) => {
      if (ok === true) {
        return "green";
      }
      if (ok === false) {
        return "red";
      } else {
        return "black";
      }
    });

    setColors(colorsUpdated);
  }, [nailed, setColors]);
}

export function useSetColored(
  captured: string[],
  colors: Color[],
  setColored: React.Dispatch<React.SetStateAction<JSX.Element[] | undefined>>
) {
  useEffect(() => {
    if (captured) {
      const _colored = captured.map((word, index) => {
        const color = colors[index];
        return (
          <Typography
            variant="h5"
            key={`colored-${index}`}
            sx={{ display: "inline", color: color, margin: 1 }}
          >
            {word}
          </Typography>
        );
      });
      // console.log(`_colored: ${JSON.stringify(_colored, null, 2)}`);
      setColored(_colored);
    }
  }, [captured, colors, setColored]);
}
