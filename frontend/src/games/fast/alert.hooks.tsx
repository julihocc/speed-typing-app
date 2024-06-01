import { useEffect } from "react";

export function useSetOpenWhenGameEndTimeIsNotNull(
  gameEndTime: number | null,
  remainingTime: number | null,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setGameEndTime: (endTime: number | null) => void
) {
  useEffect(() => {
    if (gameEndTime !== null || remainingTime === 0) {
      if (remainingTime === 0) {
        console.log("remainingTime is 0");
        if (gameEndTime === null) {
          console.log("gameEndTime is null");
          const now = new Date().getTime();
          console.log("Setting gameEndTime to now: ", now);
          // gameEndTime = now;
          setGameEndTime(now);
        }
      }

      if (gameEndTime !== null) {
        console.log("gameEndTime is not null");
      }

      setOpen(true);
    }
  }, [gameEndTime, setOpen, remainingTime]);
}

export function useSetMatchRecordWhenTimeIsOver(
  gameStartTime: number | null,
  gameEndTime: number | null,
  words: string[],
  nailedWords: (boolean | null)[],
  initialTimerValue: number,
  remainingTime: number | null,
  setMatchRecord: React.Dispatch<React.SetStateAction<MatchRecord>>
) {
  useEffect(() => {
    if (gameStartTime !== null && gameEndTime !== null) {
      const totalWords = words.length;
      const totalNailedWords = nailedWords.filter(
        (nailed) => nailed === true
      ).length;
      const totalTime = gameEndTime - gameStartTime;

      const matchRecord: MatchRecord = {
        gameStartTime,
        gameEndTime,
        totalTime,
        remainingTime,
        initialTimerValue,
        totalWords,
        totalNailedWords,
      };

      console.log("Match record to be pushed: ", JSON.stringify(matchRecord));

      setMatchRecord(matchRecord);
    }
  }, [
    gameStartTime,
    gameEndTime,
    words,
    nailedWords,
    initialTimerValue,
    remainingTime,
    setMatchRecord,
  ]);
}
