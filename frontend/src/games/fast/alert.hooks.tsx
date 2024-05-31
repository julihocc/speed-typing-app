import { useEffect } from "react";

export function useSetOpenWhenGameEndTimeIsNotNull(
  gameEndTime: number | null,
  remainingTime: number | null,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    if (gameEndTime !== null || remainingTime === 0) {
      setOpen(true);
    }
  }, [gameEndTime, setOpen, remainingTime]);
}

export function useSetMatchRecordWhenTimeIsOver(
  gameStartTime: number | null,
  gameEndTime: number | null,
  words: string[],
  nailed: (boolean | null)[],
  initialTimerValue: number,
  remainingTime: number | null,
  setMatchRecord: React.Dispatch<React.SetStateAction<MatchRecord>>
) {
  useEffect(() => {
    if (gameStartTime !== null && gameEndTime !== null) {
      const totalWords = words.length;
      const nailedWords = nailed.filter((nailed) => nailed === true).length;
      const totalTime = gameEndTime - gameStartTime;
      setMatchRecord({
        gameStartTime,
        gameEndTime,
        totalChars: totalWords,
        nailedChars: nailedWords,
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
    initialTimerValue,
    remainingTime,
    setMatchRecord,
  ]);
}
