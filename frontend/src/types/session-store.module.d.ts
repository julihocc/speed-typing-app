type Color = "green" | "red" | "black";

type GameMode = "1" | "2" | "3";

interface GameSlice {
  chars: string[];
  capturedChars: string[];
  nailedChars: (boolean | null)[];
  charColors: Color[];
  gameStartTime: number | null;
  gameEndTime: number | null;
  textFieldValue: string | undefined;
  randomIndex: number | null;
  gameMode: GameMode;
  backspaceDisabled: boolean;
  words: string[];
  nailedWords: (boolean | null)[];
  capturedWords: string[];
  setCapturedChars: (captured: string[]) => void;
  setNailedChars: (nailed: (boolean | null)[]) => void;
  setCharColors: (colors: Color[]) => void;
  setGameStartTime: (initTime: number | null) => void;
  setGameEndTime: (endTime: number | null) => void;
  resetGame: () => void;
  setChars: (text: string[]) => void;
  setTextFieldValue: (initialTextFieldValue: string | undefined) => void;
  setRandomIndex: (randomIndex: number | null) => void;
  setGameMode: (gameMode: GameMode) => void;
  setBackspaceDisabled: (backspaceDisabled: boolean) => void;
  setWords: (words: string[]) => void;
  setNailedWords: (nailedWords: (boolean | null)[]) => void;
  setCapturedWords: (capturedWords: string[]) => void;
}

interface TimerSlice {
  initialTimerValue: number;
  remainingTime: number | null;
  setRemainingTime: (remainingTime: number | null) => void;
  resetTimer: () => void;
  setInitialTimerValue: (initialTimerValue: number) => void;
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
