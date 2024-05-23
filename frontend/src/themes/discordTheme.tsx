import { createTheme } from "@mui/material/styles";

const discordTheme = createTheme({
  palette: {
    primary: {
      main: "#5865F2", // Blurple
      light: "#7289DA", // Lighter blurple
      dark: "#4752C4", // Darker blurple for contrast
      contrastText: "#FFFFFF", // Ensure white text on blurple buttons
    },
    secondary: {
      main: "#2F3136",
      light: "#36393F", // A touch lighter for subtle variations
      dark: "#202225", // Darker for more contrast
    },
    background: {
      default: "#36393F",
      paper: "#2F3136",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B9BBBE", // Maintains readability
      disabled: "#72767D", // For disabled elements
    },
    error: {
      main: "#F04747",
      light: "#F28282", // Lighter for hover states
      dark: "#C03838", // Darker for stronger emphasis
    },
    warning: {
      main: "#FAA61A",
      light: "#FBBF5C", // Lighter for hover states
      dark: "#C88500", // Darker for stronger emphasis
    },
    success: {
      // Add a success color
      main: "#3BA55D", // Green
    },
    divider: "#202225", // Subtle divider color
  },
  typography: {
    fontFamily: "'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif", // Fallback fonts
    fontWeightLight: 400,
    fontWeightRegular: 500, // Make regular text a bit bolder
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: "2.5rem", // Larger headings for a Discord feel
    },
    h2: {
      fontSize: "2rem",
    },
    body1: {
      fontSize: "1rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 20, // More rounded button corners
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 16, // Add default padding to paper elements
        },
      },
    },
  },
});

export default discordTheme;
