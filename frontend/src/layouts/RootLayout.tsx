import { NavLink, Outlet } from "react-router-dom";
// import { Heading, Section, TabNav } from "@radix-ui/themes";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function RootLayout() {
  return (
    <>
      {/* <TabNav.Root>
        <TabNav.Link asChild>
          <NavLink to="/">Home</NavLink>
        </TabNav.Link>
        <TabNav.Link asChild>
          <NavLink to="/Login">Login</NavLink>
        </TabNav.Link>
        <TabNav.Link asChild>
          <NavLink to="/Dashboard">Dashboard</NavLink>
        </TabNav.Link>
      </TabNav.Root> */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Speed Typing App
            </Typography>
          </Toolbar>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Login">Login</NavLink>
          <NavLink to="/Dashboard">Dashboard</NavLink>
        </AppBar>

        <Outlet />
      </Box>
    </>
  );
}
