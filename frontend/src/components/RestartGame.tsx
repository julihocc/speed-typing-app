import useSessionStore from "../stores/session-store";
// import { Button } from "@radix-ui/themes";
import Button from "@mui/material/Button";

export default function RestartGame() {
  const resetGame = useSessionStore((state) => state.resetGame);
  const resetTimer = useSessionStore((state) => state.resetTimer);
  const gameEndTime = useSessionStore((state) => state.gameEndTime);

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
