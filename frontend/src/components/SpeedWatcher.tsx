import useSessionStore from "../stores/session-store";
import useIndexedStore from "../stores/indexed-store";
import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Container, Typography, Card, CardContent } from "@mui/material";

export default function SpeedWatcher() {
  const [speeds, setSpeeds] = useState<number[] | null>([]);
  const [dates, setDates] = useState<string[] | null>([]);
  const [maxSpeed, setMaxSpeed] = useState<number>(0);
  const [minSpeed, setMinSpeed] = useState<number>(0);
  // const { currentUser } = useBoundStore();
  const { currentUserEmail } = useSessionStore();
  const { getUserByEmail } = useIndexedStore();

  const currentUser = getUserByEmail(currentUserEmail);

  useEffect(() => {
    const _speeds = currentUser
      ? currentUser.matchRecords.map((record) => {
          if (record.gameStartTime === null) return 0;
          if (record.gameEndTime === null) return 0;
          if (record.totalWords === null) return 0;
          const timeDiff = record.gameEndTime - record.gameStartTime;
          const timeInSeconds = timeDiff / 1000;
          return record.totalWords / timeInSeconds;
        })
      : null;

    setSpeeds(_speeds);
  }, [currentUser, currentUser?.matchRecords]);

  useEffect(() => {
    if (speeds === null) return;
    setMinSpeed(Math.min(...speeds));
    setMaxSpeed(Math.max(...speeds));
  }, [speeds]);

  useEffect(() => {
    const _dates = currentUser
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

    setDates(_dates);
  }, [currentUser, currentUser?.matchRecords]);

  return (
    <Container>
      <Typography variant="h5">Speed Watcher</Typography>

      <Card>
        <CardContent>
          <Typography>
            Max Speed: {maxSpeed.toFixed(2)} chars per second
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography>
            Min Speed: {minSpeed.toFixed(2)} chars per second
          </Typography>
        </CardContent>
      </Card>

      <BarChart
        width={800}
        height={400}
        series={[
          {
            data: speeds || [],
            label: "Speed (words per second)",
          },
        ]}
        xAxis={[{ scaleType: "band", data: dates || [] }]}
      />
    </Container>
  );
}
