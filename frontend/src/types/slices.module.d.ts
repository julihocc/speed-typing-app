type Color = "green" | "red" | undefined;

interface GameSlice {
  captured: string[];
  nailed: (boolean | null)[];
  colors: Color[];
  initTime: number | null;
  endTime: number | null;
  setCaptured: (captured: string[]) => void;
  setNailed: (nailed: (boolean | null)[]) => void;
  setColors: (colors: Color[]) => void;
  setInitTime: (initTime: number | null) => void;
  setEndTime: (endTime: number | null) => void;
  resetGame: () => void;
}

interface TimerSlice {
  remainingTime: number;
  setRemainingTime: (remainingTime: number) => void;
}

type BoundStore = GameSlice & TimerSlice;
