import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import useSessionStore from "../../stores/session-store";
import { useState } from "react";
import useIndexedStore from "../../stores/indexed-store";
import {
  useSetOpenWhenGameEndTimeIsNotNull,
  useSetMatchRecordWhenTimeIsOver,
} from "./alert.hooks";
import { setHandleClose } from "./alert.handlers";
import nullMatchRecord from "../../utils/nullMatchRecord";

export default function GameOverAlert() {
  const [open, setOpen] = useState(false);
  const [matchRecord, setMatchRecord] = useState<MatchRecord>(nullMatchRecord);

  const {
    chars,
    gameStartTime,
    gameEndTime,
    initialTimerValue,
    resetGame,
    resetTimer,
    currentUserEmail,
    currentUserIsAuthenticated,
    words,
    nailedWords
  } = useSessionStore();

  const { pushMatchRecord } = useIndexedStore();

  useSetOpenWhenGameEndTimeIsNotNull(
    chars,
    gameStartTime,
    gameEndTime,
    setOpen
  );

  useSetMatchRecordWhenTimeIsOver(
    gameStartTime,
    gameEndTime,
    words,
    nailedWords,
    initialTimerValue,
    setMatchRecord
  );

  const handleClose = setHandleClose(
    resetGame,
    resetTimer,
    currentUserEmail,
    currentUserIsAuthenticated,
    matchRecord,
    pushMatchRecord,
    setMatchRecord,
    setOpen,
    nullMatchRecord
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Game Over"}</DialogTitle>
      <DialogContent>
        <DialogContentText>Your game has ended.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
