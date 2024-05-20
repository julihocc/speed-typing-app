import { Outlet, NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function RootLayout() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Speed Typing Game
          </Typography>
          <Button color="inherit">
            <NavLink to="/">Home</NavLink>
          </Button>
          <Button color="inherit">
            <NavLink to="/Dashboard">Dashboard</NavLink>
          </Button>
          <NavLink to="/Login">Login</NavLink>
          <Button color="inherit"></Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
