import useBoundStore from "../store";
import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function HistoricalMatchAccuracy() {
  const { matchRecords } = useBoundStore();
  const [historicalAccuracy, setHistoricalAccuracy] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    const accuracies = matchRecords.map((record) => {
      if (record.totalWords === 0) return 0;
      if (record.totalWords === null) return 0;
      if (record.nailedWords === null) return 0;
      return (100 * record.nailedWords) / record.totalWords;
    });

    setHistoricalAccuracy(accuracies);
  }, [matchRecords]);

  useEffect(() => {
    const dates = matchRecords.map((record) => {
      if (record.gameStartTime === null) return "";
      return new Date(record.gameStartTime).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
    });

    setDates(dates);
  }, [matchRecords]);

  return (
    <>
      <h2>Historical Match Accuracy</h2>
      <LineChart
        width={800}
        height={400}
        series={[
          {
            data: historicalAccuracy,
            type: "line",
            label: "Accuracy (%)",
          },
        ]}
        xAxis={[{ scaleType: "point", data: dates }]}
      />
    </>
  );
}
