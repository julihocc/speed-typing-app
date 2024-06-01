import { useState, useEffect, useRef } from "react";
import useSessionStore from "../stores/session-store";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import { useSpring, animated } from "@react-spring/web";

export default function Timer2() {
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

  const [secUnits, setSecUnits] = useState<number | null>(null);
  const [secTens, setSecTens] = useState<number | null>(null);
  const prevSecUnitsRef = useRef(secUnits);
  const prevSecTensRef = useRef(secTens);

  const animationSecUnits = useSpring({
    from: { rotateZ: 0, opacity: 0 },
    to: { rotateZ: 360, opacity: 1 },

    config: { duration: 1000 },
  });

  const animationSecTens = useSpring({
    from: { rotateZ: 0, opacity: 0 }, // Start from 0-degree rotation, hidden
    to: { rotateZ: 360, opacity: 1 }, // Rotate a full 360 degrees, become visible

    config: { duration: 1000 },
  });

  useEffect(() => {
    if (remainingTime !== null) {
      const newSecUnits = remainingTime % 10;
      setSecUnits(newSecUnits);
      if (prevSecUnitsRef.current !== newSecUnits) {
        animationSecUnits.rotateZ.reset();
        animationSecUnits.opacity.reset();
      }
      prevSecUnitsRef.current = newSecUnits;
    }
  }, [animationSecUnits, remainingTime]);

  useEffect(() => {
    if (remainingTime !== null) {
      const newSecTens = Math.floor(remainingTime / 10);
      setSecTens(newSecTens);

      if (prevSecTensRef.current !== newSecTens) {
        animationSecTens.rotateZ.reset();
        animationSecTens.opacity.reset();
      }
      prevSecTensRef.current = newSecTens;
    }
  }, [animationSecTens, remainingTime]);

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box display="flex" alignItems="center" margin={2}>
          <Box
            p={2}
            sx={{
              border: 1,
              borderRadius: "100%",
              width: "2rem",
              heigth: "2rem",
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <AnimatedTypography variant="h5" style={animationSecTens}>
              {remainingTime === null
                ? Math.floor(initialTimerValue / 10)
                : secTens}
            </AnimatedTypography>
          </Box>
          <Box
            p={2}
            sx={{
              border: 1,
              borderRadius: "100%",
              width: "2rem",
              heigth: "2rem",
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <AnimatedTypography variant="h5" style={animationSecUnits}>
              {remainingTime === null ? initialTimerValue % 10 : secUnits}
            </AnimatedTypography>
          </Box>
        </Box>
        <Box>
          <Typography>seconds</Typography>
        </Box>
      </Box>
    </div>
  );
}