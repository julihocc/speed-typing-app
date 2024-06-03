export const alertSelector = (state: SessionStore) => ({
  gameStartTime: state.gameStartTime,
  gameEndTime: state.gameEndTime,
  initialTimerValue: state.initialTimerValue,
  resetGame: state.resetGame,
  resetTimer: state.resetTimer,
  currentUserEmail: state.currentUserEmail,
  currentUserIsAuthenticated: state.currentUserIsAuthenticated,
  remainingTime: state.remainingTime,
  words: state.words,
  nailedWords: state.nailedWords,
  setGameEndTime: state.setGameEndTime,
});
