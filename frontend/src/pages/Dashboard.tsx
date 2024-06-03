import ResetMatchRecords from "../components/ResetMatchRecords";
import PageLayout from "../layouts/PageLayout";

import { Box, Button } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import CurrentUser from "../components/CurrentUser";

export default function Dashboard() {
  return (
    <PageLayout title="Dashboard">
      <Box p={2} display="flex" alignItems="center" justifyContent="center">
        <Box m={2}>
          <ResetMatchRecords />
        </Box>
        <Box m={2}>
          <Button variant="outlined" color="primary">
            <NavLink
              to="speedwatcher"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Speed Watcher
            </NavLink>
          </Button>
        </Box>
        <Box m={2}>
          <Button variant="outlined" color="primary">
            <NavLink
              to="historicalmatchaccuracy"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Historical Match Accuracy
            </NavLink>
          </Button>
        </Box>
        <Box m={2}>
          <Button
            variant="outlined"
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
