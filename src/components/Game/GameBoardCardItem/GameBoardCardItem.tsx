import React from "react";
import styles from "./GameBoardCardItem.module.scss";
import { PlayersGetType } from "@/types/PlayersGetType";
import { Doc } from "../../../../convex/_generated/dataModel";

import { figuresList } from "@/constants/figures";
import { cardsList } from "@/constants/cards";
import Image from "next/image";
import { CardsGetType } from "@/types/CardsGetType";

type PropsType = {
  players: PlayersGetType[];
  cards: CardsGetType[];
  index: number;
  setOpenIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function GameBoardCardItem({
  players,
  cards,
  index,
  setOpenIndex,
}: PropsType) {
  return (
    <>
      {index === 0 && (
        <div className={styles.angleCard1} onClick={() => setOpenIndex(index)}>
          <Image src={cardsList[index].svg} alt={"card"} />
        </div>
      )}
      {index === 10 && (
        <div className={styles.angleCard2} onClick={() => setOpenIndex(index)}>
          <Image src={cardsList[index].svg} alt={"card"} />
        </div>
      )}
      {index === 20 && (
        <div className={styles.angleCard3} onClick={() => setOpenIndex(index)}>
          <Image src={cardsList[index].svg} alt={"card"} />
        </div>
      )}
      {index === 30 && (
        <div className={styles.angleCard4} onClick={() => setOpenIndex(index)}>
          <Image src={cardsList[index].svg} alt={"card"} />
        </div>
      )}
      {index % 10 !== 0 && (
        <div className={styles.card} onClick={() => setOpenIndex(index)}>
          <Image src={cardsList[index].svg} alt={"card"} />
        </div>
      )}
    </>
  );
}
