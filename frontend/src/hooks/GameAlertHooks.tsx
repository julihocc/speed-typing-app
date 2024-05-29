import { useEffect } from "react";

export function useSetOpenWhenGameEndTimeIsNotNull(
  gameEndTime: number | null,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    if (gameEndTime !== null) {
      setOpen(true);
    }
  }, [gameEndTime, setOpen]);
}

export function useSetMatchRecordWhenTimeIsOver(
  gameStartTime: number | null,
  gameEndTime: number | null,
  words: string[],
  nailed: (boolean | null)[],
  initialTimerValue: number,
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
        totalWords,
        nailedWords,
        totalTime,
        remainingTime: initialTimerValue,
        initialTimerValue,
      });
    }
  }, [
    gameStartTime,
    gameEndTime,
    words,
    nailed,
    initialTimerValue,
    setMatchRecord,
  ]);
}
