import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import useSWR from "swr";

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
      setRandomIndex(Math.floor(Math.random() * 5));
    }
  }, [setRandomIndex, randomIndex]);
}

// export function useSetRandomText(
//   randomIndex: number | null,
//   setTextToBeCaptured: React.Dispatch<React.SetStateAction<string>>
// ) {
//   useEffect(() => {
//     if (randomIndex === null) {
//       return;
//     }
//     const url = "http://localhost:3000/" + randomIndex;
//     fetch(url)
//       .then((response) => response.text())
//       .then((data) => {
//         if (data === "Not Found") {
//           console.error("Not Found");
//           return;
//         }
//         const obj = JSON.parse(data);
//         setTextToBeCaptured(obj.text);
//       });
//   }, [randomIndex, setTextToBeCaptured]);
// }

// async function fetchText(randomIndex: number | null) {
//   if (randomIndex === null) {
//     throw new Error("No index provided");
//   }
//   const url = `http://localhost:3000/${randomIndex}`;
//   const response = await fetch(url);
//   const data = await response.text();
//   if (data === "Not Found") {
//     throw new Error("Not Found");
//   }
//   const obj = JSON.parse(data);
//   return obj.text;
// }

// export function useSetRandomText(randomIndex: number | null) {
//   return useQuery(["randomText", randomIndex], () => fetchText(randomIndex), {
//     enabled: randomIndex !== null,
//     retry: false,
//   });
// }

export function useSetRandomText(
  randomIndex: number | null,
  setTextToBeCaptured: React.Dispatch<React.SetStateAction<string>>
) {
  const fetcher = (url: string) =>
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        if (data === "Not Found") {
          console.error("Not Found");
          return;
        }
        const obj = JSON.parse(data);
        setTextToBeCaptured(obj.text);
      });

  const output = useSWR(`http://localhost:3000/${randomIndex}`, fetcher);
  // const output = useSWR(`http://localhost:3000/${randomIndex}`, fetcher, {
  //   suspense: true,
  // });
  console.log(`output: ${JSON.stringify(output, null, 2)}`);

  return output;
  // const { data, error } = output;

  // let textToBeCaptured = "";
  // if (data && data !== "Not Found") {
  //   const obj = JSON.parse(data);
  //   textToBeCaptured = obj.text;
  // } else {
  //   console.error("Not Found:( ", error);
  // }

  // return {
  //   text: textToBeCaptured,
  //   isLoading: !error && !data,
  //   isError: error || data === "Not Found",
  // };

  // useEffect(() => {
  //   if (textToBeCaptured) {
  //     setTextToBeCaptured(textToBeCaptured);
  //   }
  // }, [textToBeCaptured, setTextToBeCaptured]);
}

export function useSetChars(
  textToBeCaptured: string,
  setChars: (text: string[]) => void
) {
  useEffect(() => {
    // setChars(textToBeCaptured.trim().split(""));
    setChars(textToBeCaptured.split(""));
  }, [setChars, textToBeCaptured]);
}

export function useSetWords(
  textToBeCaptured: string,
  setWords: (words: string[]) => void
) {
  useEffect(() => {
    setWords(textToBeCaptured.trim().split(" "));
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
            className={`inline text-${color} bg-${color} bg-opacity-50 p-1`}
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
