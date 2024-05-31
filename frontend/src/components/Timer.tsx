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

  const AnimatedTypography = animated(Typography);

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

  // Animation configuration

  const [secUnits, setSecUnits] = useState<number | null>(null);
  const [secTens, setSecTens] = useState<number | null>(null);
  const prevSecUnitsRef = useRef(secUnits);
  const prevSecTensRef = useRef(secTens);

  const animationSecUnits = useSpring({
    from: { y: -20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: { duration: 1000 },
    // reset: true,
  });

  const animationSecTens = useSpring({
    from: { y: -20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: { duration: 1000 },
    // reset: true,
  });

  useEffect(() => {
    if (remainingTime !== null) {
      const newSecUnits = remainingTime % 10;
      setSecUnits(newSecUnits);
      if (prevSecUnitsRef.current !== newSecUnits) {
        animationSecUnits.y.reset();
        animationSecUnits.opacity.reset();
      }
      prevSecUnitsRef.current = newSecUnits;
    }
  }, [animationSecUnits, remainingTime]);

  useEffect(() => {
    if (remainingTime !== null) {
      const newSecTens = Math.floor(remainingTime / 10);
      setSecTens(newSecTens);
      console.log(`newSecTens: ${newSecTens}`);
      console.log(`prevSecTensRef.current: ${prevSecTensRef.current}`);
      if (prevSecTensRef.current !== newSecTens) {
        console.log("Starting animation");
        animationSecTens.y.reset();
        animationSecTens.opacity.reset();
        // prevSecTensRef.current = newSecTens;
      }
      prevSecTensRef.current = newSecTens;
    }
  }, [animationSecTens, remainingTime]);

  // useEffect(() => {
  //   console.log(`remainingTime: ${remainingTime}`);
  //   if (remainingTime !== null) {
  //     setSecUnits(remainingTime % 10);
  //   }
  // }, [remainingTime]);

  // useEffect(() => {

  //   console.log(`remainingTime: ${remainingTime}`);
  //   console.log(prevSecTensRef.current);
  //   console.log(secTens);
  //   if (remainingTime !== null) {
  //     setSecTens(Math.floor(remainingTime / 10));
  //   }
  // }, [remainingTime, secTens]);

  return (
    <div>
      <Box display="flex" alignItems="center" gap={4} margin={2}>
        {" "}
        <AnimatedTypography variant="h2" style={animationSecTens}>
          {remainingTime === null
            ? Math.floor(initialTimerValue / 10)
            : secTens}
        </AnimatedTypography>
        <AnimatedTypography variant="h2" style={animationSecUnits}>
          {remainingTime === null ? initialTimerValue % 10 : secUnits}
        </AnimatedTypography>
      </Box>
    </div>
  );
}
