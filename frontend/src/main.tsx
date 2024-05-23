import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GameOverAlert from "./components/GameOverAlert";

// import { ThemeProvider } from "@mui/material/styles";
// import discordTheme from "./themes/discordTheme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <>
      {/* <ThemeProvider theme={discordTheme}> */}
      <GameOverAlert />
      <App />
      {/* </ThemeProvider> */}
    </>
  </React.StrictMode>
);
