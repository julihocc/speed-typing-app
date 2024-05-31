import { useEffect } from "react";
import Typography from "@mui/material/Typography";

export const useFocusInput = (inputRef: React.RefObject<HTMLInputElement>) => {
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);
};

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

      setColored(_colored);
    }
  }, [captured, colors, setColored]);
}
