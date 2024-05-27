import useBoundStore from "../bound-store";
// import { Button } from "@radix-ui/themes";
import Button from "@mui/material/Button";

export default function RestartGame() {
  const resetGame = useBoundStore((state) => state.resetGame);
  const resetTimer = useBoundStore((state) => state.resetTimer);
  const gameEndTime = useBoundStore((state) => state.gameEndTime);

  return (
    <Button
      variant="contained"
      color="primary"
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
