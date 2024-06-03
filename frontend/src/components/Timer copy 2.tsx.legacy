import { useState, useEffect, useRef } from "react";
import useSessionStore from "../stores/session-store";
import Box from "@mui/material/Box";
import { LinearProgress, Typography } from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";
import { useSpring, animated } from "@react-spring/web";

export default function Timer() {
  // const [remainingTime, setRemainingTime] = useState<number>(60);
  const initialTimerValue = useSessionStore((state) => state.initialTimerValue);
  const remainingTime = useSessionStore((state) => state.remainingTime);
  const setRemainingTime = useSessionStore((state) => state.setRemainingTime);
  const gameEndTime = useSessionStore((state) => state.gameEndTime);

  const [progressPercentage, setProgressPercentage] = useState<number>(100);

  // const props = useSpring({
  //   from: { opacity: 0 },
  //   to: { opacity: 1 },
  //   config: { duration: 1000 },
  // });
  
  const intensity = 0.2;
  const speed = 1;

  // const props = useSpring({
  //   from: { scale: 1 },
  //   to: { scale: 1 + intensity },
  //   config: { duration: 1000 / speed },
  //   loop: true,
  //   yoyo: true, // Reverse the animation on each loop
  // });

  const props = useSpring({
    from: { scale: 1 },
    to: [{ scale: 1 + intensity }, { scale: 1 }], // Two steps: scale up, then back to 1
    config: { duration: 1000 / speed },
    loop: true,
  });

  const AnimatedTypography = animated(Typography);
  const prevTimeRef = useRef(remainingTime)

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
          <Gauge
            width={100}
            height={100}
            value={
              remainingTime === null
                ? 100
                : (100 * remainingTime) / initialTimerValue
            }
            startAngle={-90}
            endAngle={90}
            text={
              remainingTime === null
                ? initialTimerValue.toString()
                : remainingTime.toString()
            }
          />
        </Box>
        <AnimatedTypography variant="h2" style={props}>
          {remainingTime === null ? initialTimerValue : remainingTime} sec
        </AnimatedTypography>
      </Box>
    </div>
  );
}
