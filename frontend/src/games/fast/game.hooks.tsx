import { useEffect } from "react";
import { Typography, Box } from "@mui/material";

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
        // .slice(capturedChars.length > 20 ? capturedChars.length - 20 : 0)
        .map((char, index) => {
          const color = charColors[index];
          return (
            <Box
              className="flex flex-col justify-center align-middle "
              key={`colored-${index}`}
            >
              <Typography
                variant="h6"
                className={`inline text-${color}-500 bg-${color}-500  bg-opacity-10 px-2`}
              >
                {char}
              </Typography>
            </Box>
          );
        })
        .slice(-10);
      setCharColored(_colored);
    }
  }, [capturedChars, charColors, setCharColored]);
}
