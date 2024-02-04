import styles from "@/components/Game/Swap/Swap.module.scss";
import { figuresList } from "@/constants/figures";
import { cardsList } from "@/constants/cards";
import IconButton from "@/components/Buttons/IconButton/IconButton";
import Image from "next/image";
import React from "react";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { CardsGetType } from "@/types/CardsGetType";
import { PlayersGetType } from "@/types/PlayersGetType";
import Money from "@/components/Game/Money/Money";

export default function Inventory({
  functionalComponent,
  player,
  cards,
  choose,
  chooseCards,
  money,
  setMoney,
}: {
  functionalComponent: boolean;
  player: PlayersGetType;
  cards: CardsGetType[];
  choose?: (card: Id<"cards">) => void;
  chooseCards: Id<"cards">[];
  money: number;
  setMoney?: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className={styles.inventory}>
      <div
        style={{
          backgroundColor: figuresList[player.selected].bg,
        }}
        className={styles.figureBlock}
      />
      <div className={styles.info}>
        {cards
          .filter((card) => {
            if (functionalComponent) {
              if (card?.owner === player._id) {
                return !(cardsList[card.index].class === "street" && card.status !== 0);
              }
              return false;
            } else {
              return card && chooseCards.includes(card._id);
            }
          })
          .map((card) => {
            if (card) {
              if (functionalComponent) {
                return (
                  <IconButton
                    key={card._id}
                    className={chooseCards.includes(card._id) ? styles.chosenCard : ""}
                    onClick={() => choose!(card._id)}
                  >
                    <Image src={cardsList[card.index].svg} alt={"card"} />
                  </IconButton>
                );
              } else {
                return (
                  <Image key={card._id} src={cardsList[card.index].svg} alt={"card"} />
                );
              }
            }
          })}
        {money && <Money value={money} />}
      </div>
      {functionalComponent && (
        <input
          type="number"
          className={styles.input}
          value={money !== 0 ? money : ""}
          max={player.balance}
          min={0}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val > player.balance) {
              setMoney!(player.balance);
            } else if (val < 0) {
              setMoney!(0);
            } else {
              setMoney!(val);
            }
          }}
          placeholder="Сумма ✦"
        />
      )}
    </div>
  );
}
