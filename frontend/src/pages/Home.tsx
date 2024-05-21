import Paragraph from "../components/Paragraph";
import InputArea from "../components/InputArea";
import { useRef } from "react";

export default function Home() {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const text = "This is a paragraph component";

  const handleFocusClick = () => {
    inputRef.current?.focus(); // Focus the textarea when the button is clicked
  };


  return (
    <div>
      <Paragraph text={text} />
      <InputArea ref={inputRef} text={text} />
      <button onClick={handleFocusClick}>Focus TextArea</button>
    </div>
  );
}
