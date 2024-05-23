import MatchRecordViewer from "../components/MatchRecordViewer";
import ResetMatchRecords from "../components/ResetMatchRecords";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ResetMatchRecords />
      <MatchRecordViewer />
    </div>
  );
}
