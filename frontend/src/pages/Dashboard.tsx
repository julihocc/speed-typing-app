import MatchRecordViewer from "../components/MatchRecordViewer";
import ResetMatchRecords from "../components/ResetMatchRecords";
import HistoricalMatchAccuracy from "../components/historicalMatchAccuracy";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HistoricalMatchAccuracy />
      <ResetMatchRecords />
      <MatchRecordViewer />
    </div>
  );
}
