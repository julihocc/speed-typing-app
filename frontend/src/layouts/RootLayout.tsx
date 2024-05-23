import { NavLink, Outlet } from "react-router-dom";
// import { Heading, Section, TabNav } from "@radix-ui/themes";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function RootLayout() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Speed Typing App
            </Typography>

            <NavLink
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Home
            </NavLink>
            <NavLink
              to="/Login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Login
            </NavLink>
            <NavLink
              to="/Dashboard"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Dashboard
            </NavLink>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
}
