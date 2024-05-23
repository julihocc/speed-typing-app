import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%" appearance="dark">
      <App />
    </Theme>
    <App />
  </React.StrictMode>
);
