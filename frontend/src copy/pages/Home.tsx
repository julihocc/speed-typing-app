import Game from "../components/Game";
import Timer from "../components/Timer";
import RestartGame from "../components/RestartGame";

export default function Home() {
  return (
    <div>
      <Game />
      <Timer />
      <RestartGame />
    </div>
  );
}
