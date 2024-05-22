import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import GameOverAlert from "./components/GameOverAlert";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="dark" radius="full">
      <GameOverAlert />
      <App />
    </Theme>
  </React.StrictMode>
);
