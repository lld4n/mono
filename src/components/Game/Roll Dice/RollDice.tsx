"use client";
import Dice from "@/components/Game/Dice/Dice";
import styles from "./RollDice.module.scss";
import { useEffect, useRef, useState } from "react";

export type RollDiceType = [number, number];

export default function RollDice({
  rolling,
}: {
  rolling: (r: RollDiceType) => void;
}) {
  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);

  const [isRolling, setIsRolling] = useState<boolean>(false);

  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (value1 !== 0 && value2 !== 0) {
      if (ref1.current && ref2.current) {
        ref1.current?.scroll({
          top: 6 * 90 + value1 * 90,
          left: 0,
          behavior: "smooth",
        });
        ref2.current?.scroll({
          top: 6 * 90 + value2 * 90,
          left: 0,
          behavior: "smooth",
        });
      }
      rolling([value1, value2]);
    }
  }, [value1, value2]);

  function roll() {
    setIsRolling(true);
    const val1 = Math.floor(Math.random() * (7 - 1) + 1);
    const val2 = Math.floor(Math.random() * (7 - 1) + 1);
    setValue1(val1);
    setValue2(val2);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.dices}>
        <div className={styles.dice} ref={ref1}>
          {[...new Array(7)].map((_, index) => (
            <Dice level={index} key={index} />
          ))}
          {[...new Array(6)].map((_, index) => (
            <Dice level={index + 1} key={index * 2 + 1} />
          ))}
        </div>
        <div className={styles.dice} ref={ref2}>
          {[...new Array(7)].map((_, index) => (
            <Dice level={index} key={index} />
          ))}
          {[...new Array(6)].map((_, index) => (
            <Dice level={index + 1} key={index * 2 + 1} />
          ))}
        </div>
      </div>
      {!isRolling && (
        <button className={styles.button} onClick={() => roll()}>
          Бросить кубики
        </button>
      )}
    </div>
  );
}
