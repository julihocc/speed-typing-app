import MatchRecordViewer from "../components/MatchRecordViewer";
import ResetMatchRecords from "../components/ResetMatchRecords";
import HistoricalMatchAccuracy from "../components/HistoricalMatchAccuracy";
import SpeedWatcher from "../components/SpeedWatcher";
import PageLayout from "../layouts/PageLayout";
import useBoundStore from "../stores/bound-store";

export default function Dashboard() {
  const { currentUserEmail } = useBoundStore();


  if (currentUserEmail === null) {
    return null;
  }
  return (
    <PageLayout title="Dashboard">
      <SpeedWatcher />
      <HistoricalMatchAccuracy />
      <ResetMatchRecords />
      <MatchRecordViewer />
    </PageLayout>
  );
}
