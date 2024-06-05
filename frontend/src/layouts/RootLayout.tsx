import { NavLink, Outlet } from "react-router-dom";
// import { Heading, Section, TabNav } from "@radix-ui/themes";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Logout from "../components/Logout";
import useSessionStore from "../stores/session-store";

export default function RootLayout() {
  const { currentUserIsAuthenticated } = useSessionStore();
  return (
    <div className="font-body">
      <Container maxWidth={"md"} className="font-body">
        <Box className="flex-grow">
          <AppBar position="static">
            <Toolbar>
              <Box p={2}>
                <Typography
                  variant="h3"
                  component="div"
                  className="flex-grow text-pink-500 font-body"
                >
                  Speed Typing App
                </Typography>
              </Box>

              <ButtonGroup
                color="secondary"
                variant="contained"
                disableElevation
                className="flex-grow"
              >
                <NavLink
                  to="/"
                  // style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button className="h-20">Let's play! 🚀 </Button>
                </NavLink>

                <NavLink
                  to="/Dashboard"
                  // style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button className="h-20">Dashboard </Button>
                </NavLink>

                {!currentUserIsAuthenticated ? (
                  <NavLink
                    to="/Login"
                    // style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {" "}
                    <Button className="h-20">Login</Button>
                  </NavLink>
                ) : (
                  <Logout />
                )}
              </ButtonGroup>
            </Toolbar>
          </AppBar>
        </Box>
      </Container>
      <Outlet />
    </div>
  );
}
