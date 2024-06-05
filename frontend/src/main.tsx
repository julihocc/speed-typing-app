import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StyledEngineProvider } from "@mui/material/styles";

import { ThemeProvider } from "@mui/material/styles";
import light from "./themes/light.tsx";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <ThemeProvider theme={light}>
//       <App />
//     </ThemeProvider>
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={light}>
        // <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
