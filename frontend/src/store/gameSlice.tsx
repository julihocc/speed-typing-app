import { StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

persist;
immer;
devtools;

export interface GameSlice {
  captured: string[];
  setCaptured: (captured: string[]) => void;
}

export const createGameSlice: StateCreator<
  GameSlice,
  [
    ["zustand/immer", never],
    ["zustand/persist", unknown],
    ["zustand/devtools", never]
  ]
> = (set) => ({
  captured: ["hello"],
  setCaptured: (captured) =>
    set((state) => {
      state.captured = captured;
      return state;
    }),
});
