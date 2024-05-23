import useBoundStore from "../store";
import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function SpeedWatcher() {
  const { matchRecords } = useBoundStore();
  const [speeds, setSpeeds] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [maxSpeed, setMaxSpeed] = useState<number>(0);
  const [minSpeed, setMinSpeed] = useState<number>(0);

  useEffect(() => {
    const _speeds = matchRecords.map((record) => {
      if (record.gameStartTime === null) return 0;
      if (record.gameEndTime === null) return 0;
      if (record.totalWords === null) return 0;
      const timeDiff = record.gameEndTime - record.gameStartTime;
      const timeInSeconds = timeDiff / 1000;
      return record.totalWords / timeInSeconds;
    });

    setSpeeds(_speeds);
  }, [matchRecords]);

  useEffect(() => {
    setMinSpeed(Math.min(...speeds));
    setMaxSpeed(Math.max(...speeds));
  }, [speeds]);

  useEffect(() => {
    const _dates = matchRecords.map((record) => {
      if (record.gameStartTime === null) return "";
      return new Date(record.gameStartTime).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
    });

    setDates(_dates);
  }, [matchRecords]);

  return (
    <div>
      <h2>Speed Watcher</h2>
      <p>
        <strong>Max Speed:</strong> {maxSpeed.toFixed(2)} words per second
      </p>
      <p>
        <strong>Min Speed:</strong> {minSpeed.toFixed(2)} words per second
      </p>
      <BarChart
        width={800}
        height={400}
        series={[
          {
            data: speeds,
            label: "Speed (words per second)",
          },
        ]}
        xAxis={[{ scaleType: "band", data: dates }]}
      />
    </div>
  );
}
