import useSessionStore from "../stores/session-store";

export default function ToggleMode() {
  const { gameMode, setGameMode, resetGame, resetTimer } = useSessionStore();

  const handleToggleMode = () => {
    resetGame();
    resetTimer();
    gameMode === "1" ? setGameMode("2") : setGameMode("1");
  };

  return (
    <div
      onClick={handleToggleMode}
      className="text-primary border-2 border-primary hover:bg-primary hover:text-white p-2 rounded-md cursor-pointer"
    >
      Toggle Mode
    </div>
  );
}
