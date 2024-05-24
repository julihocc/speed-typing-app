import { NavLink, Outlet } from "react-router-dom";
// import { Heading, Section, TabNav } from "@radix-ui/themes";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function RootLayout() {
  return (
    <Container maxWidth="md">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
              Speed Typing App
            </Typography>
            <ButtonGroup color="secondary" variant="contained" disableElevation>
              <Button>
                <NavLink
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Home
                </NavLink>
              </Button>
              <Button>
                <NavLink
                  to="/Login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Login
                </NavLink>
              </Button>
              <Button>
                <NavLink
                  to="/Dashboard"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Dashboard
                </NavLink>
              </Button>
            </ButtonGroup>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </Container>
  );
}
