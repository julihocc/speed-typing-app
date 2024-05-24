import MatchRecordViewer from "../components/MatchRecordViewer";
import ResetMatchRecords from "../components/ResetMatchRecords";
import HistoricalMatchAccuracy from "../components/HistoricalMatchAccuracy";
import SpeedWatcher from "../components/SpeedWatcher";
import PageLayout from "../layouts/PageLayout";

export default function Dashboard() {
  return (
    <PageLayout title="Dashboard">
      <SpeedWatcher />
      <HistoricalMatchAccuracy />
      <ResetMatchRecords />
      <MatchRecordViewer />
    </PageLayout>
  );
}
