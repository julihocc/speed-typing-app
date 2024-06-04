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
      const _colored = capturedChars
        .slice(capturedChars.length > 20 ? capturedChars.length - 20 : 0)
        .map((char, index) => {
          const color = charColors[index];
          return (
            <Typography
              variant="h6"
              key={`colored-${index}`}
              className={`inline text-${color} bg-${color} p-1`}
            >
              {char}
            </Typography>
          );
        });

      setCharColored(_colored);
    }
  }, [capturedChars, charColors, setCharColored]);
}
