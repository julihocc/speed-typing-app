import { createTheme } from "@mui/material/styles";

const light = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Your primary color
    },
    // ... other colors
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Your chosen font family
    // ... other typography settings
  },
  spacing: 8, // Your base spacing unit
  // ... other theme options (breakpoints, zIndex, etc.)
});

export default light;