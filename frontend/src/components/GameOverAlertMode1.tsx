import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import useSessionStore from "../stores/session-store";
import { useState } from "react";
import useIndexedStore from "../stores/indexed-store";
import {
  useSetOpenWhenGameEndTimeIsNotNull,
  useSetMatchRecordWhenTimeIsOver,
} from "../hooks/GameAlertHooks";

export const nullMatchRecord: MatchRecord = {
  gameStartTime: null,
  gameEndTime: null,
  totalWords: null,
  nailedWords: null,
  totalTime: null,
  remainingTime: null,
  initialTimerValue: null,
};

export default function GameOverAlert() {
  const [open, setOpen] = useState(false);
  const [matchRecord, setMatchRecord] = useState<MatchRecord>(nullMatchRecord);

  const {
    gameStartTime,
    gameEndTime,
    words,
    nailed,
    initialTimerValue,
    resetGame,
    resetTimer,
    currentUserEmail,
    currentUserIsAuthenticated,
  } = useSessionStore();

  const { pushMatchRecord } = useIndexedStore();

  useSetOpenWhenGameEndTimeIsNotNull(gameEndTime, setOpen);

  // useEffect(() => {
  //   if (gameStartTime !== null && gameEndTime !== null) {
  //     const totalWords = words.length;
  //     const nailedWords = nailed.filter((nailed) => nailed === true).length;
  //     const totalTime = gameEndTime - gameStartTime;
  //     setMatchRecord({
  //       gameStartTime,
  //       gameEndTime,
  //       totalWords,
  //       nailedWords,
  //       totalTime,
  //       remainingTime: initialTimerValue,
  //       initialTimerValue,
  //     });
  //   }
  // }, [gameStartTime, gameEndTime, words, nailed, initialTimerValue]);
  useSetMatchRecordWhenTimeIsOver(
    gameStartTime,
    gameEndTime,
    words,
    nailed,
    initialTimerValue,
    setMatchRecord
  );

  const handleClose = () => {
    resetGame();
    resetTimer();
    // addMatchRecord(matchRecord);
    if (currentUserIsAuthenticated && currentUserEmail) {
      console.log(
        `Pushing match record for ${currentUserEmail}: ${JSON.stringify(
          matchRecord
        )}`
      );
      pushMatchRecord(currentUserEmail, matchRecord);
    }
    setMatchRecord(nullMatchRecord);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Game Over"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your game has ended. Here are your results...
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
