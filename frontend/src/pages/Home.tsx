// import Game from "../components/Game";
import GameMode1 from "../components/Game.mode1";
import GameOverAlertMode1 from "../components/Alert.mode1";
import GameMode2 from "../components/Game.mode2";
import GameOverAlertMode2 from "../components/Alert.mode2";
import RestartGame from "../components/RestartGame";
import PageLayout from "../layouts/PageLayout";
import useSessionStore from "../stores/session-store";
import ToggleMode from "../components/ToggleMode";
import { useEffect } from "react";

export default function Home() {
  const { gameMode, setGameMode } = useSessionStore();

  useEffect(() => {
    // gameMode = 2
    setGameMode("2");
  }, [setGameMode]);

  return (
    <PageLayout title="Home">
      {/* <Game /> */}
      {gameMode === "1" ? <GameOverAlertMode1 /> : null}
      {gameMode === "1" ? <GameMode1 /> : null}
      {gameMode === "2" ? <GameOverAlertMode2 /> : null}
      {gameMode === "2" ? <GameMode2 /> : null}
      <RestartGame />
      <ToggleMode />
    </PageLayout>
  );
}
