import MatchRecordViewer from "../components/MatchRecordViewer";
import ResetMatchRecords from "../components/ResetMatchRecords";
import { LineChartHero } from "../components/LineChartHero";
import { Box } from "@radix-ui/themes";

export default function Dashboard() {
  return (
    // <div>
    //   <h1>Dashboard</h1>
    //   <Box>
    //     <LineChartHero />
    //   </Box>
    //   <ResetMatchRecords />
    //   <MatchRecordViewer />
    // </div>\
      <LineChartHero />
  );
}
