import { GetTimeGame } from "@/utils/GetTimeGame";
import { useEffect, useState } from "react";

export default function Timer({ time }: { time: number }) {
  const [currentTime, setCurrentTime] = useState<string>(GetTimeGame(time));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(GetTimeGame(time));
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return <>{currentTime}</>;
}
