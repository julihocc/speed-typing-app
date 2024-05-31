import { useEffect } from "react";
import Typography from "@mui/material/Typography";

export const useFocusInput = (inputRef: React.RefObject<HTMLInputElement>) => {
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);
};

export function useSetCharColors(
  nailedChars: (boolean | null)[],
  setCharColors: (colors: Color[]) => void
) {
  useEffect(() => {
    const colorsUpdated = nailedChars.map((ok) => {
      if (ok === true) {
        return "green";
      }
      if (ok === false) {
        return "red";
      } else {
        return "black";
      }
    });
    setCharColors(colorsUpdated);
  }, [nailedChars, setCharColors]);
}

export function useSetColored(
  capturedChars: string[],
  charColors: Color[],
  setCharColored: React.Dispatch<
    React.SetStateAction<JSX.Element[] | undefined>
  >
) {
  useEffect(() => {
    if (capturedChars) {
      const _colored = capturedChars.map((word, index) => {
        const color = charColors[index];
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

      setCharColored(_colored);
    }
  }, [capturedChars, charColors, setCharColored]);
}
