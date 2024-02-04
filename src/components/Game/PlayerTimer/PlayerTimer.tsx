"use client";
import React from "react";
import styles from "./PlayerTimer.module.scss";
import { Timer } from "lucide-react";

const REFRESH_INTERVAL = 1000 / 30;

export default function PlayerTimer({ timer }: { timer: number }) {
  const countdown = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const [time, setTime] = React.useState(-1);

  const stopTimer = () => {
    if (countdown.current) {
      clearInterval(countdown.current);
      countdown.current = null;
    }
  };
  const syncTimer = () => {
    const timestamp = new Date(timer).getTime();
    if (timestamp >= Date.now()) {
      countdown.current = setInterval(() => {
        setTime(timestamp - Date.now());
        if (timestamp < Date.now()) {
          stopTimer();
        }
      }, REFRESH_INTERVAL);
    }
  };

  React.useEffect(() => {
    syncTimer();

    return () => {
      if (countdown.current) {
        clearInterval(countdown.current);
        countdown.current = null;
      }
    };
  }, [timer]);

  if (time < 0) {
    return <></>;
  }

  if (time < 10000) {
    return (
      <div className={styles.danger}>
        <Timer size={16} color="#f85149" />
        <div className={styles.s}>{Math.floor(time / 1000)}</div>
        <div className={styles.ms}>{time % 1000}</div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Timer size={16} color="#ffffff" />
      <div className={styles.s}>{Math.floor(time / 1000)}</div>
    </div>
  );
}
