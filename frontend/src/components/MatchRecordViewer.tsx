import  useBoundStore  from "../store";

export default function MatchRecordViewer() {
  
  const matchRecords = useBoundStore((state) => state.getMatchRecords());

  return (
    <div>
      {matchRecords.map((matchRecord, index) => (
        <div key={index}>
          <p>Game start time: {matchRecord.gameStartTime}</p>
          <p>Game end time: {matchRecord.gameEndTime}</p>
          <p>Total words: {matchRecord.totalWords}</p>
          <p>Nailed words: {matchRecord.nailedWords}</p>
          <p>Total time: {matchRecord.totalTime}</p>
          <p>Remaining time: {matchRecord.remainingTime}</p>
          <p>Initial timer value: {matchRecord.initialTimerValue}</p>
        </div>
      ))}
    </div>
  );
}