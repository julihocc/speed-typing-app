import { createTheme } from "@mui/material/styles";

const light = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4caf50", // Green
      light: "#81c784",
      dark: "#388e3c",
    },
    secondary: {
      main: "#ff9800", // Orange
    },
    background: {
      default: "#f2f2f2", // Light beige background
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#616161",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif", // Ensure quotes around font name
    h1: {
      fontSize: "3rem", // Larger headline size
      fontWeight: 700, // Bold weight for impact
    },
    h2: {
      fontSize: "2.5rem", // Adjusted headline size
    },
    // ... other typography styles as needed
  },
  spacing: 8, // Keep your base spacing unit
  breakpoints: {
    values: {
      xs: 0,
      sm: 600, // Common breakpoint for small screens
      md: 960, // Common breakpoint for medium screens
      lg: 1280, // Common breakpoint for large screens
      xl: 1920, // Common breakpoint for extra-large screens
    },
  },
  shape: {
    borderRadius: 8, // A slightly rounded corner for elements
  },
  components: {
    // Example component override (you can add more as needed)
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Disable default uppercase
          borderRadius: 8, // Match the general shape
        },
      },
    },
  },
});

export default light;
