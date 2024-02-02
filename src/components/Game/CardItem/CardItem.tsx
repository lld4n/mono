import React from "react";
import styles from "./CardItem.module.scss";
import { PlayersGetType } from "@/types/PlayersGetType";
import { cardsList } from "@/constants/cards";
import Image from "next/image";
import { CardsGetType } from "@/types/CardsGetType";
import Money from "@/components/Game/Money/Money";
import { GetFigureFromSelected } from "@/utils/GetFigureFromSelected";
import { GetPlayerFromId } from "@/utils/GetPlayerFromId";
import bedolaga from "@/assets/emojis/bedolaga.svg";
type PropsType = {
  players: PlayersGetType[];
  cards: CardsGetType[];
  index: number;
  setOpenIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function CardItem({ players, cards, index, setOpenIndex }: PropsType) {
  const currentCard = cardsList[index];
  const bdCard = cards[index];
  const stylesCard =
    styles.cell +
    " " +
    (index <= 39 && index > 29
      ? styles.cell_left
      : index <= 29 && index > 19
        ? styles.cell_bottom
        : index <= 19 && index > 9
          ? styles.cell_right
          : styles.cell_top);

  if (index % 10 === 0) {
    return (
      <div
        className={styles.square}
        onClick={() => setOpenIndex(index)}
        title={String(index)}
      >
        <Image src={currentCard.svg} alt={currentCard.name} />
      </div>
    );
  }
  if (currentCard.class === "lucky") {
    return (
      <div
        className={stylesCard}
        onClick={() => setOpenIndex(index)}
        title={String(index)}
      >
        <Image src={currentCard.svg} alt={currentCard.name} />
      </div>
    );
  }
  if (currentCard.class === "tax") {
    return (
      <div
        className={stylesCard}
        onClick={() => setOpenIndex(index)}
        title={String(index)}
      >
        <div className={styles.money}>
          <Money value={currentCard.pay} />
        </div>
        <Image src={currentCard.svg} alt={currentCard.name} />
      </div>
    );
  }
  if (currentCard.class === "train" || currentCard.class === "nature") {
    if (bdCard?.owner === undefined) {
      return (
        <div
          className={stylesCard}
          onClick={() => setOpenIndex(index)}
          title={String(index)}
        >
          <div className={styles.money}>
            <Money value={currentCard.buy} />
          </div>
          <Image src={currentCard.svg} alt={currentCard.name} />
        </div>
      );
    } else if (!bdCard.mortgage) {
      const fig = GetFigureFromSelected(GetPlayerFromId(players, bdCard.owner)!);
      return (
        <div
          className={stylesCard}
          onClick={() => setOpenIndex(index)}
          title={String(index)}
          style={{
            backgroundColor: fig.bg,
          }}
        >
          <div className={styles.money}>
            <Money value={currentCard.buy} />
          </div>
          <Image src={currentCard.svg} alt={currentCard.name} />
        </div>
      );
    } else {
      const fig = GetFigureFromSelected(GetPlayerFromId(players, bdCard.owner)!);
      return (
        <div
          className={stylesCard}
          onClick={() => setOpenIndex(index)}
          title={String(index)}
          style={{
            backgroundColor: fig.bg,
          }}
        >
          <Image src={currentCard.svg} alt={currentCard.name} />
          <div className={styles.block}>
            <Image src={bedolaga} alt="bedolaga" />
          </div>
        </div>
      );
    }
  }
  if (currentCard.class === "street") {
    if (bdCard?.owner === undefined) {
      return (
        <div
          className={stylesCard}
          onClick={() => setOpenIndex(index)}
          title={String(index)}
        >
          <div className={styles.money}>
            <Money value={currentCard.buy} />
          </div>
          <Image src={currentCard.svg} alt={currentCard.name} />
        </div>
      );
    } else if (!bdCard.mortgage && bdCard.status === 0) {
      const fig = GetFigureFromSelected(GetPlayerFromId(players, bdCard.owner)!);
      return (
        <div
          className={stylesCard}
          onClick={() => setOpenIndex(index)}
          title={String(index)}
          style={{
            backgroundColor: fig.bg,
          }}
        >
          <div className={styles.money}>
            <Money value={currentCard.rent[bdCard.status]} />
          </div>
          <Image src={currentCard.svg} alt={currentCard.name} />
        </div>
      );
    } else if (!bdCard.mortgage && bdCard.status < 5) {
      const fig = GetFigureFromSelected(GetPlayerFromId(players, bdCard.owner)!);
      return (
        <div
          className={stylesCard}
          onClick={() => setOpenIndex(index)}
          title={String(index)}
          style={{
            backgroundColor: fig.bg,
          }}
        >
          <div className={styles.money}>
            <Money value={currentCard.rent[bdCard.status]} />
          </div>
          <Image src={currentCard.svg} alt={currentCard.name} />
          <div className={styles.block}>
            {new Array(bdCard.status).fill(0).map((e) => {
              return <div key={e} className={styles.house} />;
            })}
          </div>
        </div>
      );
    } else if (!bdCard.mortgage && bdCard.status === 5) {
      const fig = GetFigureFromSelected(GetPlayerFromId(players, bdCard.owner)!);
      return (
        <div
          className={stylesCard}
          onClick={() => setOpenIndex(index)}
          title={String(index)}
          style={{
            backgroundColor: fig.bg,
          }}
        >
          <div className={styles.money}>
            <Money value={currentCard.rent[bdCard.status]} />
          </div>
          <Image src={currentCard.svg} alt={currentCard.name} />
          <div className={styles.block}>
            <div className={styles.hotel} />
          </div>
        </div>
      );
    } else {
      const fig = GetFigureFromSelected(GetPlayerFromId(players, bdCard.owner)!);
      return (
        <div
          className={stylesCard}
          onClick={() => setOpenIndex(index)}
          title={String(index)}
          style={{
            backgroundColor: fig.bg,
          }}
        >
          <Image src={currentCard.svg} alt={currentCard.name} />
          <div className={styles.block}>
            <Image src={bedolaga} alt="bedolaga" />
          </div>
        </div>
      );
    }
  }

  return <div></div>;
}
