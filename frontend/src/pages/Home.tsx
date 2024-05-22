import Game from "../components/Game";
import Timer from "../components/Timer";
import ResetGame from "../components/ResetGame";

export default function Home() {
  return (
    <div>
      <Game />
      <Timer />
      <ResetGame />
    </div>
  );
}
