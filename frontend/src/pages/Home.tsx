// import Game from "../components/Game";
import GameMode1 from "../games/slow/Game";
import GameOverAlertMode1 from "../games/slow/Alert";
import GameMode2 from "../games/fast/Game";
import GameOverAlertMode2 from "../games/fast/Alert";
import RestartGame from "../components/RestartGame";
import PageTemplate from "../layouts/PageLayout";
import useSessionStore from "../stores/session-store";
import ToggleMode from "../components/ToggleMode";
import { useEffect, useState } from "react";
import DisableBackspace from "../components/DisableBackspace";
import { Box } from "@mui/material";

export default function Home() {
  const { gameMode } = useSessionStore();
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    // gameMode = 2
    if (gameMode === "1") {
      setTitle("Type the words in the correct order!");
    }
    if (gameMode === "2") {
      setTitle("Type the words as fast as you can!");
    }
  }, [gameMode]);

  return (
    <PageTemplate title={title}>
      <Box className="flex flex-col items-center">
        {gameMode === "1" ? <GameOverAlertMode1 /> : null}
        {gameMode === "1" ? <GameMode1 /> : null}
        {gameMode === "2" ? <GameOverAlertMode2 /> : null}
        {gameMode === "2" ? <GameMode2 /> : null}
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" p={4}>
        <Box p={4}>
          <RestartGame />
        </Box>
        <Box p={4}>
          <ToggleMode />
        </Box>
        {gameMode === "1" && (
          <Box p={4}>
            <DisableBackspace />
          </Box>
        )}
      </Box>
    </PageTemplate>
  );
}
