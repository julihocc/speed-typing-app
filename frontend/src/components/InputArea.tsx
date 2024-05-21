import { TextArea } from "@radix-ui/themes";
import { forwardRef } from "react";

// export default function InputArea({ text }: { text: string }) {
//   return <TextArea placeholder={text} />;
// }
const InputArea = forwardRef<HTMLTextAreaElement, { text: string }>(
  (props, ref) => {
    return <TextArea defaultValue={props.text} ref={ref} />;
  }
);

export default InputArea;
