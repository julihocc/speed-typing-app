type Color = "green" | "red" | undefined;

type GameMode = "1" | "2" | "3";

interface GameSlice {
  words: string[];
  captured: string[];
  nailed: (boolean | null)[];
  colors: Color[];
  gameStartTime: number | null;
  gameEndTime: number | null;
  textFieldValue: string | undefined;
  randomIndex: number | null;
  gameMode: GameMode;
  setCaptured: (captured: string[]) => void;
  setNailed: (nailed: (boolean | null)[]) => void;
  setColors: (colors: Color[]) => void;
  setGameStartTime: (initTime: number | null) => void;
  setGameEndTime: (endTime: number | null) => void;
  resetGame: () => void;
  setWords: (text: string[]) => void;
  setTextFieldValue: (initialTextFieldValue: string | undefined) => void;
  setRandomIndex: (randomIndex: number | null) => void;
  setGameMode: (gameMode: GameMode) => void;
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

interface CurrentUserSlice {
  currentUserEmail: string | null;
  currentUserIsAuthenticated: boolean;
  setCurrentUserEmail: (email: string) => void;
  setCurrentUserIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

type SessionStore = GameSlice & TimerSlice & CurrentUserSlice;