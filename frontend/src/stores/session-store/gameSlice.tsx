import { StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

persist;
immer;
devtools;

export const createGameSlice: StateCreator<
  SessionStore,
  [
    ["zustand/immer", never],
    ["zustand/persist", unknown],
    ["zustand/devtools", never]
  ],
  [],
  GameSlice
> = (set) => ({
  chars: [],
  captured: [],
  nailed: [],
  colors: [],
  gameStartTime: null,
  gameEndTime: null,
  textFieldValue: undefined,
  randomIndex: null,
  gameMode: "1",
  backspaceDisabled: false,
  setTextFieldValue: (text) =>
    set(
      (state) => {
        state.textFieldValue = text;
        return state;
      },
      false,
      "setTextFieldValue"
    ),
  setCaptured: (captured) =>
    set(
      (state) => {
        state.captured = captured;
        return state;
      },
      false,
      "setCaptured"
    ),
  setNailed: (nailed) =>
    set(
      (state) => {
        state.nailed = nailed;
        return state;
      },
      false,
      "setNailed"
    ),
  setColors: (colors) =>
    set(
      (state) => {
        state.colors = colors;
        return state;
      },
      false,
      "setColors"
    ),
  setGameStartTime: (initTime) =>
    set(
      (state) => {
        state.gameStartTime = initTime;
        return state;
      },
      false,
      "setGameStartTime"
    ),
  setGameEndTime: (endTime) =>
    set(
      (state) => {
        state.gameEndTime = endTime;
        return state;
      },
      false,
      "setGameEndTime"
    ),
  resetGame: () =>
    set(
      (state) => {
        state.captured = [];
        state.nailed = [];
        state.colors = [];
        state.gameStartTime = null;
        state.gameEndTime = null;
        state.textFieldValue = undefined;
        state.randomIndex = null;
        return state;
      },
      false,
      "resetGame"
    ),
  setChars: (text) =>
    set(
      (state) => {
        state.chars = text;
        return state;
      },
      false,
      "setChars"
    ),
  setRandomIndex: (randomIndex) =>
    set(
      (state) => {
        state.randomIndex = randomIndex;
        return state;
      },
      false,
      "setRandomIndex"
    ),
  setGameMode: (gameMode) =>
    set(
      (state) => {
        state.gameMode = gameMode;
        return state;
      },
      false,
      "setGameMode"
    ),
  setBackspaceDisabled: (backspaceDisabled) =>
    set(
      (state) => {
        state.backspaceDisabled = backspaceDisabled;
        return state;
      },
      false,
      "setBackspaceDisabled"
    ),
});
