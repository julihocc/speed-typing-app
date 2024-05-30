import MatchRecordViewer from "../components/MatchRecordViewer";
import ResetMatchRecords from "../components/ResetMatchRecords";
import HistoricalMatchAccuracy from "../components/HistoricalMatchAccuracy";
import SpeedWatcher from "../components/SpeedWatcher";
import PageLayout from "../layouts/PageLayout";
import useSessionStore from "../stores/session-store";
import useIndexedStore from "../stores/indexed-store";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
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
      {currentUser && (
        <Typography>¡Bienvenido, {currentUser.firstName}!</Typography>
      )}
      {currentUser && avatar !== null && (
        <img
          src={avatar}
          alt="avatar"
          style={{ width: "100px", height: "100px" }}
        />
      )}
      <SpeedWatcher />
      <HistoricalMatchAccuracy />
      <ResetMatchRecords />
      <MatchRecordViewer />
    </PageLayout>
  );
}
