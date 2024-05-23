import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GameOverAlert from "./components/GameOverAlert";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GameOverAlert />
    <App />
  </React.StrictMode>
);
