interface Words {
  id: string;
  randomWords: string[];
}

interface MatchRecord {
  gameStartTime: number | null;
  gameEndTime: number | null;
  totalChars: number | null;
  nailedChars: number | null;
  totalTime: number | null;
  initialTimerValue: number | null;
  remainingTime: number | null;
  totalWords: number | null;
  nailedWords: number | null;
}
