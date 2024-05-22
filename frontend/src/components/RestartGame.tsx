import useBoundStore from "../store";
import { Button } from "@radix-ui/themes";

export default function RestartGame() {
  const resetGame = useBoundStore((state) => state.resetGame);
  const resetTimer = useBoundStore((state) => state.resetTimer);

  return (
    <Button
      onClick={() => {
        resetGame();
        resetTimer();
      }}
    >
      Restart Game
    </Button>
  );
}
