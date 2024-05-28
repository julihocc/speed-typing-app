import MatchRecordViewer from "../components/MatchRecordViewer";
import ResetMatchRecords from "../components/ResetMatchRecords";
import HistoricalMatchAccuracy from "../components/HistoricalMatchAccuracy";
import SpeedWatcher from "../components/SpeedWatcher";
import PageLayout from "../layouts/PageLayout";
import useSessionStore from "../stores/session-store";

export default function Dashboard() {
  const { currentUserEmail } = useSessionStore();

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
