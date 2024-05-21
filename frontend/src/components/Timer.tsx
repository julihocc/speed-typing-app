import { useState, useEffect } from "react";
import { Progress } from "@radix-ui/themes";

export default function Timer() {
  const [remainingTime, setRemainingTime] = useState<number>(60);

  const [progressPercentage, setProgressPercentage] = useState<number>(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setProgressPercentage((remainingTime / 60) * 100);
  }, [remainingTime]);

  return (
    <div>
      <Progress value={progressPercentage} />
    </div>
  );
}
