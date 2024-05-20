import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme
      appearance="light"
      accentColor="iris"
      grayColor="gray"
      panelBackground="translucent"
      scaling="100%"
      radius="full"
    >
      <App />
    </Theme>
  </React.StrictMode>
);
