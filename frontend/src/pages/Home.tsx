// import Game from "../components/Game";
import GameMode1 from "../components/Game.mode1";
import GameOverAlertMode1 from "../components/Alert.mode1";
import GameMode2 from "../components/Game.mode2";
import GameOverAlertMode2 from "../components/Alert.mode2";
import RestartGame from "../components/RestartGame";
import PageLayout from "../layouts/PageLayout";
import useSessionStore from "../stores/session-store";
import ToggleMode from "../components/ToggleMode";
import { useEffect, useState } from "react";
import DisableBackspace from "../components/DisableBackspace";
import { Grid, Box } from "@mui/material";

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

  //   return (
  //     <PageLayout title={title}>
  //       {/* <Game /> */}
  //       {gameMode === "1" ? <GameOverAlertMode1 /> : null}
  //       {gameMode === "1" ? <GameMode1 /> : null}
  //       {gameMode === "2" ? <GameOverAlertMode2 /> : null}
  //       {gameMode === "2" ? <GameMode2 /> : null}
  //       {/* <RestartGame /> */}
  //       {/* <ToggleMode /> */}
  //       {/* {gameMode === "1" && <DisableBackspace />} */}

  //       <Grid container spacing={2}>
  //         <Grid item xs={3}>
  //           <RestartGame />
  //         </Grid>
  //         <Grid item xs={3}>
  //           <ToggleMode />
  //         </Grid>
  //         <Grid item xs={3}>
  //           {gameMode === "1" && <DisableBackspace />}
  //         </Grid>
  //       </Grid>
  //     </PageLayout>
  //   );
  // }

  return (
    <PageLayout title={title}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {gameMode === "1" ? <GameOverAlertMode1 /> : null}
        {gameMode === "1" ? <GameMode1 /> : null}
        {gameMode === "2" ? <GameOverAlertMode2 /> : null}
        {gameMode === "2" ? <GameMode2 /> : null}
      </Box>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={3}>
          <RestartGame />
        </Grid>
        <Grid item xs={3}>
          <ToggleMode />
        </Grid>
        <Grid item xs={3}>
          {gameMode === "1" && <DisableBackspace />}
        </Grid>
      </Grid>
    </PageLayout>
  );
}
