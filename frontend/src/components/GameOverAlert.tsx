import { AlertDialog, Button } from "@radix-ui/themes";
import useBoundStore from "../store";
import { useState, useEffect } from "react";

export default function GameOverAlert() {
  const [open, setOpen] = useState(false);
  const gameEndTime = useBoundStore((state) => state.gameEndTime);
  const remainingTime = useBoundStore((state) => state.remainingTime);
  const resetGame = useBoundStore((state) => state.resetGame);
  const resetTimer = useBoundStore((state) => state.resetTimer);

  const handleOnClick = () => {
    resetGame();
    resetTimer();
    setOpen(false);
  };

  useEffect(() => {
    if (gameEndTime !== null || remainingTime === 0) {
      setOpen(true);
    }
  }, [gameEndTime, remainingTime]);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Content>
        <AlertDialog.Title>Game Over</AlertDialog.Title>
        <AlertDialog.Description>Game over!</AlertDialog.Description>
        <AlertDialog.Cancel>
          <Button onClick={handleOnClick}>OK</Button>
        </AlertDialog.Cancel>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
