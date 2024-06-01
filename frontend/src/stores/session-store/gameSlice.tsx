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
  capturedChars: [],
  nailedChars: [],
  charColors: [],
  gameStartTime: null,
  gameEndTime: null,
  textFieldValue: undefined,
  randomIndex: null,
  gameMode: "1",
  backspaceDisabled: false,
  words: [],
  nailedWords: [],
  capturedWords: [],
  setTextFieldValue: (text) =>
    set(
      (state) => {
        state.textFieldValue = text;
        return state;
      },
      false,
      "setTextFieldValue"
    ),
  setCapturedChars: (captured) =>
    set(
      (state) => {
        state.capturedChars = captured;
        return state;
      },
      false,
      "setCaptured"
    ),
  setNailedChars: (nailed) =>
    set(
      (state) => {
        state.nailedChars = nailed;
        return state;
      },
      false,
      "setNailed"
    ),
  setCharColors: (colors) =>
    set(
      (state) => {
        state.charColors = colors;
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
        state.capturedChars = [];
        state.nailedChars = [];
        state.charColors = [];
        state.gameStartTime = null;
        state.gameEndTime = null;
        state.textFieldValue = undefined;
        state.randomIndex = null;
        state.capturedWords = [];
        state.nailedWords = [];
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
  setWords: (words) =>
    set(
      (state) => {
        state.words = words;
        return state;
      },
      false,
      "setWords"
    ),
  setNailedWords: (nailedWords) =>
    set(
      (state) => {
        state.nailedWords = nailedWords;
        return state;
      },
      false,
      "setNailedWords"
    ),
  setCapturedWords: (capturedWords) =>
    set(
      (state) => {
        state.capturedWords = capturedWords;
        return state;
      },
      false,
      "setCapturedWords"
    ),
});
