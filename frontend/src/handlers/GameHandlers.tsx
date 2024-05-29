export function setHandleKeyDown(
  gameStartTime: number | null,
  setGameStartTime: (initTime: number | null) => void
) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Backspace") {
      event.preventDefault();
    }
    if (gameStartTime === null) {
      setGameStartTime(new Date().getTime());
    }
  };
  return handleKeyDown;
}
