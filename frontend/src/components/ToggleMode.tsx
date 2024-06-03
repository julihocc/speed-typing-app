import useSessionStore from "../stores/session-store";
import { Button } from "@mui/material";

export default function ToggleMode() {
  const { gameMode, setGameMode, resetGame, resetTimer } = useSessionStore();

  const handleToggleMode = () => {
    resetGame();
    resetTimer();
    gameMode === "1" ? setGameMode("2") : setGameMode("1");
  };

  return <Button onClick={handleToggleMode}>Toggle Mode</Button>;
}
