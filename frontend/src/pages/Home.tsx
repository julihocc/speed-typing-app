// import Paragraph from "../components/Paragraph";
// import InputArea from "../components/InputArea";
import { useRef, useEffect, useState } from "react";
import { Text, TextArea } from "@radix-ui/themes";

export default function Home() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [output, setOutput] = useState("Hola");

  const text = "This is a paragraph component";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleOnChangeTextArea = () => {
    console.log(inputRef.current?.value);
    setOutput(inputRef.current?.value || "");
  };

  const tokens = text.split(" ");

  const words = tokens.map((token, index) => (
    <span key={index}>
      {token}
      {index < tokens.length - 1 && " "}
    </span>
  ));

  return (
    <div>
      <Text>{words}</Text>
      <TextArea ref={inputRef} onChange={handleOnChangeTextArea} />
      <Text> {output} </Text>
    </div>
  );
}
