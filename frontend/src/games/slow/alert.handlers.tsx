export function setHandleClose(
  resetGame: () => void,
  resetTimer: () => void,
  currentUserEmail: string | null,
  currentUserIsAuthenticated: boolean,
  matchRecord: MatchRecord | null,
  pushMatchRecord: (email: string, matchRecord: MatchRecord) => void,
  setMatchRecord: React.Dispatch<React.SetStateAction<MatchRecord>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  nullMatchRecord: MatchRecord
) {
  const handleClose = () => {
    resetGame();
    resetTimer();
    // addMatchRecord(matchRecord);
    if (!matchRecord) {
      console.error("Match record is null");
      return;
    }
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

  return handleClose;
}
