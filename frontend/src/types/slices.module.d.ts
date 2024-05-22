type Color = "green" | "red" | undefined;

interface GameSlice {
  captured: string[];
  nailed: (boolean | null)[];
  colors: Color[];
  gameStartTime: number | null;
  gameEndTime: number | null;
  setCaptured: (captured: string[]) => void;
  setNailed: (nailed: (boolean | null)[]) => void;
  setColors: (colors: Color[]) => void;
  setGameStartTime: (initTime: number | null) => void;
  setGameEndTime: (endTime: number | null) => void;
  resetGame: () => void;
}

interface TimerSlice {
  initialTimerValue: number;
  remainingTime: number | null;
  setRemainingTime: (remainingTime: number | null) => void;
  resetTimer: () => void;
}

type BoundStore = GameSlice & TimerSlice;
