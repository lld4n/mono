import React from "react";
import styles from "./CardInfoRender.module.scss";
import { CardsGetType } from "@/types/CardsGetType";
import { CardListType } from "@/types/card/CardListType";
import { PlayersGetType } from "@/types/PlayersGetType";
import Top from "@/components/Game/Center/CardInfo/CardInfoRender/Top";
import Bottom from "@/components/Game/Center/CardInfo/CardInfoRender/Bottom";

export default function CardInfoRender({
  bdCard,
  currentCard,
  setOpenIndex,
  players,
  renderBtnStreet,
  renderBtnTrainNature,
}: {
  bdCard: CardsGetType;
  currentCard: CardListType;
  setOpenIndex: React.Dispatch<React.SetStateAction<number>>;
  players: PlayersGetType[];
  renderBtnStreet: () => React.ReactNode;
  renderBtnTrainNature: () => React.ReactNode;
}) {
  if (bdCard === null) {
    return (
      <Top currentCard={currentCard} setOpenIndex={setOpenIndex} offRender={false} />
    );
  }
  return (
    <div className={styles.card}>
      <Top currentCard={currentCard} setOpenIndex={setOpenIndex} offRender={true} />
      <Bottom
        currentCard={currentCard}
        bdCard={bdCard}
        players={players}
        renderBtnStreet={renderBtnStreet}
        renderBtnTrainNature={renderBtnTrainNature}
      />
    </div>
  );
}
