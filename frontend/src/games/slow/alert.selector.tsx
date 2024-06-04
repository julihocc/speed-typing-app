export const alertSelector = (state: SessionStore) => ({
  chars: state.chars,
  gameStartTime: state.gameStartTime,
  gameEndTime: state.gameEndTime,
  initialTimerValue: state.initialTimerValue,
  resetGame: state.resetGame,
  resetTimer: state.resetTimer,
  currentUserEmail: state.currentUserEmail,
  currentUserIsAuthenticated: state.currentUserIsAuthenticated,
  words: state.words,
  nailedWords: state.nailedWords,
});
