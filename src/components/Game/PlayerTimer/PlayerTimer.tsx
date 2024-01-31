"use client";
import React from "react";
import styles from "./PlayerTimer.module.scss";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Timer } from "lucide-react";

const ReformatMs = (time: number) => {
  if (String(time).includes("-")) {
    if (String(Math.abs(time)).length !== 3) {
      return Math.abs(time) + 100;
    }
    return Math.abs(time);
  }
  if (String(Math.abs(time)).length !== 3) {
    return time + 100;
  }
  return time;
};
export default function PlayerTimer({
  game,
  onFinish,
}: {
  game: Doc<"games">;
  onFinish: () => void;
}) {
  const [time, setTime] = React.useState(10000);
  const [finish, setFinish] = React.useState(true);
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date().getTime();
      setTime(game.timer - now);
      if (game.timer - now <= 0) {
        if (!finish) {
          setFinish(true);
          onFinish();
        }
      } else {
        setFinish(false);
      }
    };

    updateTime();
    const int = setInterval(() => updateTime(), 100);

    return () => {
      clearInterval(int);
    };
  }, []);

  if (time < 0) {
    return <></>;
  }

  if (time < 10000) {
    return (
      <div className={styles.danger}>
        <Timer size={16} color="#f85149" />
        <div className={styles.s}>{Math.floor(time / 1000)}</div>
        <div className={styles.ms}>{ReformatMs(time % 1000)}</div>
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
