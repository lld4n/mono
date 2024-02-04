import React from "react";
import clover from "@/assets/emojis/clover.svg";
import styles from "./Lucky.module.scss";
import Image from "next/image";
import IconButton from "@/components/Buttons/IconButton/IconButton";
export type choiceType = {
  type: "pay" | "get";
  value: number;
};

const choiceList: choiceType[] = [
  {
    type: "pay",
    value: 100,
  },
  {
    type: "get",
    value: 100,
  },
];
export default function Lucky({
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
        <IconButton onClick={() => handle()}>
          <Image src={clover} alt="clover" />
        </IconButton>
        <IconButton onClick={() => handle()}>
          <Image src={clover} alt="clover" />
        </IconButton>
        <IconButton onClick={() => handle()}>
          <Image src={clover} alt="clover" />
        </IconButton>
        <IconButton onClick={() => handle()}>
          <Image src={clover} alt="clover" />
        </IconButton>
      </div>
    </div>
  );
}
