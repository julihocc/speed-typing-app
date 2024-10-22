import useSessionStore from "../stores/session-store";
import useIndexedStore from "../stores/indexed-store";
import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Container, Card, CardContent, CardHeader } from "@mui/material";

export default function HistoricalMatchAccuracy() {
  const { currentUserEmail } = useSessionStore();
  const { getUserByEmail } = useIndexedStore();

  const currentUser = getUserByEmail(currentUserEmail);

  const [historicalAccuracy, setHistoricalAccuracy] = useState<number[] | null>(
    []
  );
  const [dates, setDates] = useState<string[] | null>([]);

  useEffect(() => {
    const accuracies = currentUser
      ? currentUser.matchRecords.map((record) => {
          if (record.totalWords === 0) return 0;
          if (record.totalWords === null) return 0;
          if (record.totalNailedWords === null) return 0;
          return (100 * record.totalNailedWords) / record.totalWords;
        })
      : null;

    setHistoricalAccuracy(accuracies);
  }, [currentUser, currentUser?.matchRecords]);

  useEffect(() => {
    const dates = currentUser
      ? currentUser.matchRecords.map((record) => {
          if (record.gameStartTime === null) return "";
          return new Date(record.gameStartTime).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          });
        })
      : null;

    setDates(dates);
  }, [currentUser, currentUser?.matchRecords]);

  return (
    <Container>
      <Card>
        <CardContent>
          <CardHeader title="Historical Match Accuracy"></CardHeader>
          <LineChart
            width={800}
            height={400}
            series={[
              {
                data: historicalAccuracy || [],
                type: "line",
                label: "Accuracy (%)",
              },
            ]}
            xAxis={[{ scaleType: "point", data: dates || [] }]}
          />
        </CardContent>
      </Card>
    </Container>
  );
}
