// import Game from "../components/Game";
import GameMode1 from "../components/GameMode1";
import GameOverAlertMode1 from "../components/GameOverAlertMode1";
import RestartGame from "../components/RestartGame";
import PageLayout from "../layouts/PageLayout";
import useSessionStore from "../stores/session-store";

export default function Home() {
  const { gameMode } = useSessionStore();
  return (
    <PageLayout title="Home">
      {/* <Game /> */}
      {gameMode === "1" ? <GameOverAlertMode1 /> : null}
      {gameMode === "1" ? <GameMode1 /> : null}
      <RestartGame />
    </PageLayout>
  );
}
