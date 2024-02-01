import React from "react";
import clover from "@/assets/emojis/clover.svg";
import styles from "./LuckyComponent.module.scss";
import Image from "next/image";
type choiceType = {
  type: "pay" | "get";
  value: number;
};

const choiceList: choiceType[] = [
  {
    type: "pay",
    value: 50,
  },
  {
    type: "get",
    value: 100,
  },
];
export default function LuckyComponent({
  onChoice,
}: {
  onChoice: (choice: choiceType) => void;
}) {
  const handle = () => {
    onChoice(choiceList[Math.floor(Math.random() * choiceList.length)]);
  };

  return (
    <div className={styles.wrapper}>
      Выберите карточку
      <div className={styles.list}>
        <button className={styles.btn} onClick={() => handle()}>
          <Image src={clover} alt="clover" />
        </button>
        <button className={styles.btn} onClick={() => handle()}>
          <Image src={clover} alt="clover" />
        </button>
        <button className={styles.btn} onClick={() => handle()}>
          <Image src={clover} alt="clover" />
        </button>
        <button className={styles.btn} onClick={() => handle()}>
          <Image src={clover} alt="clover" />
        </button>
      </div>
    </div>
  );
}
