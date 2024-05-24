import Game from "../components/Game";
import Timer from "../components/Timer";
import RestartGame from "../components/RestartGame";
import PageLayout from "../layouts/PageLayout";

export default function Home() {
  return (
    <PageLayout title="Home">
      <Game />
      <Timer />
      <RestartGame />
    </PageLayout>
  );
}
