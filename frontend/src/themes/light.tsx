import { createTheme } from "@mui/material/styles";

const light = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6441a5",
      light: "#9067cc",
      dark: "#4e3580",
    },
    secondary: {
      main: "#00ff7f",
    },
    background: {
      default: "#18181b",
      paper: "#fe8d59",
    },
    text: {
      primary: "#131314",
      secondary: "#a1a1aa",
    },
  },
  typography: {
    fontFamily: "'Courier Prime', monospace",
  },
  // spacing: 8,
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 600,
  //     md: 960,
  //     lg: 1280,
  //     xl: 1920,
  //   },
  // },
  // shape: {
  //   borderRadius: 8,
  // },
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         textTransform: "none",
  //         borderRadius: 8,
  //       },
  //     },
  //   },
  // },
});

export default light;
