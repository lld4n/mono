import { GetFigureFromSelected } from "@/utils/GetFigureFromSelected";
import { GetPlayerFromId } from "@/utils/GetPlayerFromId";
import { PlayersGetType } from "@/types/PlayersGetType";
import styles from "./CardInfoRender.module.scss";
import { Home, Unlock } from "lucide-react";
import Money from "@/components/Game/Money/Money";
import { CardListType } from "@/types/card/CardListType";
import { CardsGetType } from "@/types/CardsGetType";
import React from "react";
export default function BottomSection({
  players,
  currentCard,
  bdCard,
  renderBtnStreet,
  renderBtnTrainNature,
}: {
  players: PlayersGetType[];
  currentCard: CardListType;
  bdCard: CardsGetType;
  renderBtnStreet: () => React.ReactNode;
  renderBtnTrainNature: () => React.ReactNode;
}) {
  if (
    bdCard !== null &&
    (currentCard.class === "street" ||
      currentCard.class === "train" ||
      currentCard.class === "nature")
  )
    return (
      <div className={styles.bottom_section}>
        <div className={styles.block}>
          <div className={styles.money}>
            <Unlock size={16} color="#ffffff" />
            <Money value={currentCard.unlock} />
          </div>
          {currentCard.class === "street" && (
            <div className={styles.money}>
              <Home size={16} color="#ffffff" />
              <Money value={currentCard.build} />
            </div>
          )}

          {bdCard.owner && (
            <div
              className={styles.owner}
              style={{
                backgroundColor: GetFigureFromSelected(
                  GetPlayerFromId(players, bdCard.owner)!,
                ).bg,
                color: GetFigureFromSelected(GetPlayerFromId(players, bdCard.owner)!)
                  .color,
              }}
            >
              {GetPlayerFromId(players, bdCard.owner)!.user?.name}
            </div>
          )}
        </div>
        <div className={styles.block}>
          {currentCard.class === "street" ? renderBtnStreet() : renderBtnTrainNature()}
        </div>
      </div>
    );
}
