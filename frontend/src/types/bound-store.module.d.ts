type Color = "green" | "red" | undefined;

interface GameSlice {
  words: string[];
  captured: string[];
  nailed: (boolean | null)[];
  colors: Color[];
  gameStartTime: number | null;
  gameEndTime: number | null;
  textFieldValue: string | undefined;
  randomIndex: number | null;
  setCaptured: (captured: string[]) => void;
  setNailed: (nailed: (boolean | null)[]) => void;
  setColors: (colors: Color[]) => void;
  setGameStartTime: (initTime: number | null) => void;
  setGameEndTime: (endTime: number | null) => void;
  resetGame: () => void;
  setWords: (text: string[]) => void;
  setTextFieldValue: (initialTextFieldValue: string | undefined) => void;
  setRandomIndex: (randomIndex: number | null) => void;
}

interface TimerSlice {
  initialTimerValue: number;
  remainingTime: number | null;
  setRemainingTime: (remainingTime: number | null) => void;
  resetTimer: () => void;
}

interface MatchRecord {
  gameStartTime: number | null;
  gameEndTime: number | null;
  totalWords: number | null;
  nailedWords: number | null;
  totalTime: number | null;
  initialTimerValue: number | null;
  remainingTime: number | null;
}

interface StatsSlice {
  matchRecords: MatchRecord[];
  addMatchRecord: (matchRecord: MatchRecord) => void;
  getMatchRecords: () => MatchRecord[];
  resetMatchRecords: () => void;
  resetStats: () => void;
}

interface CurrentUserSlice {
  currentUserEmail: string;
  currentUserPassword: string;
  setCurrentUserEmail: (email: string) => void;
  setCurrentUserPassword: (password: string) => void;
}

type BoundStore = GameSlice & TimerSlice & StatsSlice & CurrentUserSlice;
