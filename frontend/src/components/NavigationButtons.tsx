import { Button, ButtonGroup } from "@mui/material";
import { NavLink } from "react-router-dom";
import Logout from "../components/Logout";
import useSessionStore from "../stores/session-store";
export default function NavigationButtons() {
  const { currentUserIsAuthenticated } = useSessionStore();
  return (
    <ButtonGroup variant="contained" disableElevation>
      <NavLink
        to="/"
        // style={{ textDecoration: "none", color: "inherit" }}
      >
        <Button className="inline md:h-12 md:w-48 bg-secondary text-black">
          Let's play! 🚀{" "}
        </Button>
      </NavLink>

      <NavLink
        to="/Dashboard"
        // style={{ textDecoration: "none", color: "inherit" }}
      >
        <Button className="md:h-12 md:w-24 bg-secondary text-black">
          Dashboard{" "}
        </Button>
      </NavLink>

      {!currentUserIsAuthenticated ? (
        <NavLink
          to="/Login"
          // style={{ textDecoration: "none", color: "inherit" }}
        >
          {" "}
          <Button className="md:h-12 md:w-24 bg-secondary text-black">
            Login
          </Button>
        </NavLink>
      ) : (
        <Logout />
      )}
    </ButtonGroup>
  );
}
