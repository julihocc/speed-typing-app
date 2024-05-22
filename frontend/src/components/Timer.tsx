import { useState, useEffect } from "react";
import { Progress, Flex, Text, Box } from "@radix-ui/themes";
import useBoundStore from "../store";

export default function Timer() {
  // const [remainingTime, setRemainingTime] = useState<number>(60);
  const remainingTime = useBoundStore((state) => state.remainingTime);
  const setRemainingTime = useBoundStore((state) => state.setRemainingTime);

  const [progressPercentage, setProgressPercentage] = useState<number>(100);

  useEffect(() => {
    const timer = setInterval(() => {

      if (remainingTime <= 0) {
        clearInterval(timer);
        setRemainingTime(0);
      } else {
        setRemainingTime(remainingTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, setRemainingTime]);

  useEffect(() => {
    setProgressPercentage((remainingTime / 60) * 100);
  }, [remainingTime]);

  return (
    <div>
      <Flex align="center" justify="center" gapX="4">
        <Box minWidth="16rem">
          <Progress value={progressPercentage} />
        </Box>
        <Box>
          <Text>Time remaining: {remainingTime} s</Text>
        </Box>
      </Flex>
    </div>
  );
}
