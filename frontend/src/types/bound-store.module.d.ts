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

interface CurrentUserSlice {
  currentUser: IUser | null;
  currentUserEmail: string | null;
  currentUserIsAuthenticated: boolean;
  setCurrentUser: (user: IUser) => void;
  setCurrentUserEmail: (email: string) => void;
  setCurrentUserIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

type BoundStore = GameSlice & TimerSlice & CurrentUserSlice;
