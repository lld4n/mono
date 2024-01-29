import { getTimeGame } from "@/utils/GetTime";
import { useEffect, useState } from "react";

export default function Timer({ time }: { time: number }) {
  const [currentTime, setCurrentTime] = useState<string>(getTimeGame(time));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTimeGame(time));
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return <>{currentTime}</>;
}
