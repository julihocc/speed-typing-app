import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import useBoundStore from "../stores/bound-store";
import { useState, useEffect } from "react";
import useIndexedStore from "../stores/indexed-store";

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
    remainingTime,
    resetGame,
    resetTimer,
    currentUserEmail,
    currentUserIsAuthenticated,
  } = useBoundStore();

  const { pushMatchRecord } = useIndexedStore();


  useEffect(() => {
    if (gameEndTime !== null || remainingTime === 0) {
      setOpen(true);
    }
  }, [gameEndTime, remainingTime]);

  useEffect(() => {
    if (gameStartTime !== null && gameEndTime !== null) {
      const totalWords = words.length;
      const nailedWords = nailed.filter((nailed) => nailed === true).length;
      const totalTime = gameEndTime - gameStartTime;
      setMatchRecord({
        gameStartTime,
        gameEndTime,
        totalWords,
        nailedWords,
        totalTime,
        remainingTime,
        initialTimerValue,
      });
    }
  }, [
    gameStartTime,
    gameEndTime,
    words,
    nailed,
    remainingTime,
    initialTimerValue,
  ]);

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
