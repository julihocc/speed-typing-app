import ResetMatchRecords from "../components/ResetMatchRecords";
import PageLayout from "../layouts/PageLayout";
import useSessionStore from "../stores/session-store";
import useIndexedStore from "../stores/indexed-store";
import { useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import avatars from "../utils/avatars";
import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  const { currentUserEmail } = useSessionStore();
  const { getUserByEmail } = useIndexedStore();
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      const avatarIndex = currentUser.avatar;
      const selectedAvatar = avatars.find(
        (avatar) => avatar.value === avatarIndex
      );
      if (selectedAvatar) {
        setAvatar(selectedAvatar.image);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    setCurrentUser(getUserByEmail(currentUserEmail));
  }, [currentUserEmail, getUserByEmail]);

  useEffect(() => {
    console.log("currentUser", currentUser);
  }, [currentUser]);

  if (currentUserEmail === null) {
    return null;
  }

  return (
    <PageLayout title="Dashboard">
      <Box display="flex" alignItems="center" justifyContent="center" p={2}>
        <Box p={2}>
          {currentUser && (
            <Typography variant="h1">
              Now playing: {currentUser.firstName}!
            </Typography>
          )}
        </Box>
        <Box p={2}>
          {currentUser && avatar !== null && (
            <img
              src={avatar}
              alt="avatar"
              style={{ width: "100px", height: "100px", borderRadius: "20%" }}
            />
          )}
        </Box>
      </Box>

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
          <Button variant="outlined" color="primary">
            <NavLink
              to="matchrecordviewer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Match Record Viewer
            </NavLink>
          </Button>
        </Box>
      </Box>
      <Outlet />
    </PageLayout>
  );
}
