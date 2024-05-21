// import Paragraph from "../components/Paragraph";
// import InputArea from "../components/InputArea";
import { useRef, useEffect, useState } from "react";
import { Text, TextArea } from "@radix-ui/themes";

type Color = "green" | "red" | null;

export default function Home() {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const text = "This is a paragraph component";

  const words = text.split(" ");

  const [captured, setCaptured] = useState<string[]>([]);

  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleOnKeyUp = () => {
    const value = inputRef.current?.value;
    // const captured = value?.split(" ") || [];
    console.log(value);
    setCaptured(value?.split(" ") || []);
    const newStatus: Color[] = captured.map((word, index) => {
      const current = words[index];
      if (current) {
        return word === current ? "green" : "red";
      } else {
        return null;
      }
    });
    setColors(newStatus);
  };

  useEffect(() => {
    console.log(captured);
    console.log(colors);
  }, [captured, colors]);

  return (
    <div>
      <Text>{text}</Text>
      <TextArea ref={inputRef} onKeyUp={handleOnKeyUp} />
      {captured &&
        captured.map((word, index) => {
          const color = colors[index];
          return <Text color={color}>{word} </Text>;
        })}
    </div>
  );
}
