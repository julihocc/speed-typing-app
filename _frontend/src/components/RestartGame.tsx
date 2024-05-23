import useBoundStore from "../store";
import { Button } from "@radix-ui/themes";

export default function RestartGame() {
  const resetGame = useBoundStore((state) => state.resetGame);
  const resetTimer = useBoundStore((state) => state.resetTimer);
  const gameEndTime = useBoundStore((state) => state.gameEndTime);

  return (
    <Button
      onClick={() => {
        resetGame();
        resetTimer();
      }}
      disabled={gameEndTime === null ? true : false}
    >
      Restart Game
    </Button>
  );
}
