import MatchRecordViewer from "../components/MatchRecordViewer";
import ResetMatchRecords from "../components/ResetMatchRecords";
import HistoricalMatchAccuracy from "../components/HistoricalMatchAccuracy";
import SpeedWatcher from "../components/SpeedWatcher";
import PageLayout from "../layouts/PageLayout";
import useSessionStore from "../stores/session-store";
import useIndexedStore from "../stores/indexed-store";
import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import avatars from "../utils/avatars";

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
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          )}
        </Box>
      </Box>

      <SpeedWatcher />
      <HistoricalMatchAccuracy />
      <ResetMatchRecords />
      <MatchRecordViewer />
    </PageLayout>
  );
}
