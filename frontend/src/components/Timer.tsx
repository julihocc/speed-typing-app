import { useState, useEffect } from "react";
// import { Progress, Flex, Text, Box } from "@radix-ui/themes";
import useSessionStore from "../stores/session-store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

export default function Timer() {
  // const [remainingTime, setRemainingTime] = useState<number>(60);
  const initialTimerValue = useSessionStore((state) => state.initialTimerValue);
  const remainingTime = useSessionStore((state) => state.remainingTime);
  const setRemainingTime = useSessionStore((state) => state.setRemainingTime);
  const gameEndTime = useSessionStore((state) => state.gameEndTime);

  const [progressPercentage, setProgressPercentage] = useState<number>(100);

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime !== null) {
        if (remainingTime <= 0) {
          clearInterval(timer);
          setRemainingTime(0);
        }
        if (remainingTime > 0) {
          if (gameEndTime !== null) {
            clearInterval(timer);
          }
          if (gameEndTime === null) {
            setRemainingTime(remainingTime - 1);
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, setRemainingTime, gameEndTime]);

  useEffect(() => {
    if (remainingTime !== null) {
      setProgressPercentage((remainingTime / 60) * 100);
    } else {
      setProgressPercentage(100);
    }
  }, [remainingTime]);

  return (
    <div>
      <Box display="flex" alignItems="center" gap={4} margin={2}>
        <Box minWidth="16rem">
          <LinearProgress variant="determinate" value={progressPercentage} />
        </Box>
        <Box>
          <Typography variant="body1">
            Time remaining:{" "}
            {remainingTime === null ? initialTimerValue : remainingTime} s
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
