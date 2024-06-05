import useSessionStore from "../stores/session-store";

export default function RestartGame() {
  const resetGame = useSessionStore((state) => state.resetGame);
  const resetTimer = useSessionStore((state) => state.resetTimer);
  // const gameEndTime = useSessionStore((state) => state.gameEndTime);

  return (
    <div
      onClick={() => {
        resetGame();
        resetTimer();
      }}
      className="text-primary border-2 border-primary hover:bg-primary hover:text-white p-2 rounded-md cursor-pointer"
    >
      Restart Game
    </div>
  );
}
