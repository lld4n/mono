import styles from "./CardInfoRender.module.scss";
import { CardListType } from "@/types/card/CardListType";
import Group from "@/components/Game/Center/CardInfo/CardInfoRender/Group";
import Table from "@/components/Game/Center/CardInfo/CardInfoRender/Table";
import { CardsGetType } from "@/types/CardsGetType";
import BottomSection from "@/components/Game/Center/CardInfo/CardInfoRender/BottomSection";
import { PlayersGetType } from "@/types/PlayersGetType";
import React from "react";

export default function Bottom({
  currentCard,
  bdCard,
  players,
  renderBtnStreet,
  renderBtnTrainNature,
}: {
  currentCard: CardListType;
  bdCard: CardsGetType;
  players: PlayersGetType[];
  renderBtnStreet: () => React.ReactNode;
  renderBtnTrainNature: () => React.ReactNode;
}) {
  return (
    <div className={styles.bottom}>
      <Group currentCard={currentCard} />
      <Table bdCard={bdCard} currentCard={currentCard} />
      <BottomSection
        players={players}
        currentCard={currentCard}
        bdCard={bdCard}
        renderBtnTrainNature={renderBtnTrainNature}
        renderBtnStreet={renderBtnStreet}
      />
    </div>
  );
}
