import ResetMatchRecords from "../components/ResetMatchRecords";
import PageLayout from "../layouts/PageLayout";

import { Box, Button } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import CurrentUser from "../components/CurrentUser";

import { useState } from "react";

export default function Dashboard() {
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  return (
    <PageLayout title="Dashboard">
      <Box p={2} display="flex" alignItems="center" justifyContent="center">
        <Box m={2}>
          <ResetMatchRecords />
        </Box>
        <Box m={2}>
          <Button
            variant={lastClicked === "speedwatcher" ? "contained" : "outlined"}
            color="primary"
            onClick={() => setLastClicked("speedwatcher")}
          >
            <NavLink
              to="speedwatcher"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Speed Watcher
            </NavLink>
          </Button>
        </Box>
        <Box m={2}>
          <NavLink
            to="historicalmatchaccuracy"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button
              variant={
                lastClicked === "historicalmatchaccuracy"
                  ? "contained"
                  : "outlined"
              }
              color="primary"
              onClick={() => setLastClicked("historicalmatchaccuracy")}
            >
              Historical Match Accuracy{" "}
            </Button>
          </NavLink>
        </Box>
        <Box m={2}>
          <Button
            variant={
              lastClicked === "matchrecordviewer" ? "contained" : "outlined"
            }
            onClick={() => setLastClicked("matchrecordviewer")}
            color="primary"
          >
            <NavLink
              to="matchrecordviewer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Match Record Viewer
            </NavLink>
          </Button>
        </Box>
      </Box>
      <CurrentUser />
      <Outlet />
    </PageLayout>
  );
}
