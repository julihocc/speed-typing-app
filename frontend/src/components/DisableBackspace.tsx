import useSessionStore from "../stores/session-store";

export default function DisableBackspace() {
  const { backspaceDisabled, setBackspaceDisabled } = useSessionStore();

  const handleClick = () => {
    setBackspaceDisabled(!backspaceDisabled);
  };

  return (
    <div
      onClick={handleClick}
      className="text-primary border-2 border-primary hover:bg-primary hover:text-white p-2 rounded-md cursor-pointer"
    >
      {backspaceDisabled ? "Enable" : "Disable"} Backspace
    </div>
  );
}
