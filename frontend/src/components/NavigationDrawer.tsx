import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import useSessionStore from "../stores/session-store";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function NavigationDrawer() {
  const { currentUserIsAuthenticated } = useSessionStore();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box className="flex flex-col items-center justify-center h-full bg-slate-500">
      <List>
        <ListItem>
          <ListItemText>
            <Link to="/">Let's play! 🚀</Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Link
              to="/Dashboard"
              // style={{ textDecoration: "none", color: "inherit" }}
            >
              Dashboard
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            {!currentUserIsAuthenticated ? (
              <Link
                to="/Login"
                // style={{ textDecoration: "none", color: "inherit" }}
              >
                Login
              </Link>
            ) : (
              <Logout />
            )}
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          className="fill-current text-secondary"
        >
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </Button>
      <Drawer id="drawer" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
