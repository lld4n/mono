import React from "react";
import styles from "./CardInfoRender.module.scss";
import Image from "next/image";
import { cardsList } from "@/constants/cards";
import { CardListType } from "@/types/card/CardListType";
import mini_train_right from "@/assets/emojis/mini_train_right.svg";
import mini_train_left from "@/assets/emojis/mini_train_left.svg";
import mini_train_top from "@/assets/emojis/mini_train_top.svg";
import mini_train_bottom from "@/assets/emojis/mini_train_bottom.svg";
const imagesTrain = [
  mini_train_right,
  mini_train_left,
  mini_train_top,
  mini_train_bottom,
];
export default function Group({ currentCard }: { currentCard: CardListType }) {
  if (currentCard.class === "train") {
    return (
      <div className={styles.group}>
        {imagesTrain.map((el, i) => {
          return <Image key={i} src={el} alt={el} />;
        })}
      </div>
    );
  }
  if (currentCard.class === "street" || currentCard.class === "nature") {
    return (
      <div className={styles.group}>
        {currentCard.group.map((i) => {
          return (
            <Image
              key={i}
              src={cardsList[i].svg}
              alt={cardsList[i].name}
              width={22}
              height={22}
            />
          );
        })}
      </div>
    );
  }
}
