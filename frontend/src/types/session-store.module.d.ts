type Color = "green" | "red" | "black";

type GameMode = "1" | "2" | "3";

interface GameSlice {
  chars: string[];
  captured: string[];
  nailed: (boolean | null)[];
  colors: Color[];
  gameStartTime: number | null;
  gameEndTime: number | null;
  textFieldValue: string | undefined;
  randomIndex: number | null;
  gameMode: GameMode;
  backspaceDisabled: boolean;
  setCaptured: (captured: string[]) => void;
  setNailed: (nailed: (boolean | null)[]) => void;
  setColors: (colors: Color[]) => void;
  setGameStartTime: (initTime: number | null) => void;
  setGameEndTime: (endTime: number | null) => void;
  resetGame: () => void;
  setChars: (text: string[]) => void;
  setTextFieldValue: (initialTextFieldValue: string | undefined) => void;
  setRandomIndex: (randomIndex: number | null) => void;
  setGameMode: (gameMode: GameMode) => void;
  setBackspaceDisabled: (backspaceDisabled: boolean) => void;
}

interface TimerSlice {
  initialTimerValue: number;
  remainingTime: number | null;
  setRemainingTime: (remainingTime: number | null) => void;
  resetTimer: () => void;
  setInitialTimerValue: (initialTimerValue: number) => void;
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
  passwordError: string | null;
  pickedAvatar: string | null;
  setCurrentUserEmail: (email: string) => void;
  setCurrentUserIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
  setPasswordError: (passwordError: string | null) => void;
  setPickedAvatar: (avatar: string) => void;
}

type SessionStore = GameSlice & TimerSlice & CurrentUserSlice;
