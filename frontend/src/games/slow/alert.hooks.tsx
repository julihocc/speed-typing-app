import { useEffect } from "react";

export function useSetOpenWhenGameEndTimeIsNotNull(
  chars: string[],
  gameStartTime: number | null,
  gameEndTime: number | null,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    if (chars.length > 0 && gameStartTime !== null && gameEndTime !== null) {
      setOpen(true);
    }
  }, [chars, gameEndTime, setOpen, gameStartTime]);
}

export function useSetMatchRecordWhenTimeIsOver(
  gameStartTime: number | null,
  gameEndTime: number | null,
  words: string[],
  nailedWords: (boolean | null)[],
  initialTimerValue: number,
  setMatchRecord: React.Dispatch<React.SetStateAction<MatchRecord>>
) {
  useEffect(() => {
    if (gameStartTime !== null && gameEndTime !== null) {
      const totalWords = words.length;
      const totalNailedWords = nailedWords.filter(
        (nailed) => nailed === true
      ).length;
      const totalTime = gameEndTime - gameStartTime;
      setMatchRecord({
        gameStartTime,
        gameEndTime,
        totalWords,
        totalNailedWords,
        totalTime,
        remainingTime: initialTimerValue,
        initialTimerValue,
      });
    }
  }, [
    gameStartTime,
    gameEndTime,
    words,
    nailedWords,
    initialTimerValue,
    setMatchRecord,
  ]);
}
