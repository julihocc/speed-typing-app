import { Box, Typography } from "@mui/material";
import avatars from "../utils/avatars";
import { useEffect, useState } from "react";
import useSessionStore from "../stores/session-store";
import useIndexedStore from "../stores/indexed-store";

export default function CurrentUser() {
  // const { currentUserEmail } = useSessionStore();

  const { currentUserEmail } = useSessionStore((state) => ({
    currentUserEmail: state.currentUserEmail,
  }));

  const { getUserByEmail } = useIndexedStore();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

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
    <Box display="flex" alignItems="center" justifyContent="center" p={2}>
      <Box p={2}>
        {currentUser && (
          <Typography variant="h4">
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
  );
}
