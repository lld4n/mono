import React from "react";
import styles from "./CardInfoRender.module.scss";
import { Dices, Eye, EyeOff, Home, Lock, ShoppingCart, Unlock, X } from "lucide-react";
import { CardsGetType } from "@/types/CardsGetType";
import { CardListType } from "@/types/card/CardListType";
import Image from "next/image";
import { cardsList } from "@/constants/cards";
import Money from "@/components/Game/Money/Money";
import { GetFigureFromSelected } from "@/utils/GetFigureFromSelected";
import { GetPlayerFromId } from "@/utils/GetPlayerFromId";
import mini_train_right from "@/assets/emojis/mini_train_right.svg";
import mini_train_left from "@/assets/emojis/mini_train_left.svg";
import mini_train_top from "@/assets/emojis/mini_train_top.svg";
import mini_train_bottom from "@/assets/emojis/mini_train_bottom.svg";
import { PlayersGetType } from "@/types/PlayersGetType";

const imagesTrain = [
  mini_train_right,
  mini_train_left,
  mini_train_top,
  mini_train_bottom,
];

const statusStreet = [
  "Рента без домов",
  "Рента c 1 домом",
  "Рента с 2 домами",
  "Рента с 3 домами",
  "Рента с 4 домами",
  "Рента с отелем",
];

const statusTrain = [
  "Рента с одним поездом",
  "Рента с двумя поездами",
  "Рента с тремя поездами",
  "Рента с четырьмя поездами",
];

const statusNature = ["Рента с одной карточкой", "Рента с двумя карточками"];
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
  const [off, setOff] = React.useState(false);

  function Top() {
    return (
      <div className={styles.top}>
        <div className={styles.top_section}>
          <div className={styles.name}>{currentCard.name}</div>
          <div className={styles.mini_btns}>
            <button className={styles.mini_btn} onClick={() => setOff(!off)}>
              {off ? (
                <EyeOff size={16} color="#ffffff" />
              ) : (
                <Eye size={16} color="#ffffff" />
              )}
            </button>
            <button className={styles.mini_btn} onClick={() => setOpenIndex(-1)}>
              <X size={16} color="#ffffff" />
            </button>
          </div>
        </div>
        {off && <div className={styles.desc}>{currentCard.desc}</div>}
      </div>
    );
  }

  function Table({ list }: { list: string[] }) {
    if (
      bdCard !== null &&
      (currentCard.class === "street" ||
        currentCard.class === "train" ||
        currentCard.class === "nature")
    )
      return (
        <div className={styles.table}>
          <Image src={currentCard.svg} alt={currentCard.name} />
          <div className={styles.rent}>
            {list.map((el, index) => {
              return (
                <div
                  key={index}
                  className={
                    index === bdCard.status && !bdCard.mortgage
                      ? styles.status + " " + styles.status_active
                      : styles.status
                  }
                >
                  <div className={styles.status_title}>{el}</div>
                  <div className={styles.money}>
                    <Money value={currentCard.rent[index]} />
                  </div>
                </div>
              );
            })}
          </div>
          <Third />
        </div>
      );
  }

  function Third() {
    if (
      bdCard !== null &&
      (currentCard.class === "street" ||
        currentCard.class === "train" ||
        currentCard.class === "nature")
    )
      return (
        <div className={styles.third}>
          <div
            className={
              bdCard.mortgage
                ? styles.status + " " + styles.status_active
                : styles.status
            }
          >
            <div className={styles.status_title}>
              <Lock size={16} color="#ffffff" />
              Залог
            </div>
            <div className={styles.money}>
              <Money value={currentCard.buy / 2} />
            </div>
          </div>
          <div
            className={
              bdCard.buy ? styles.status + " " + styles.status_active : styles.status
            }
          >
            <div className={styles.status_title}>
              <ShoppingCart size={16} color="#ffffff" />
              Купить
            </div>
            <div className={styles.money}>
              <Money value={currentCard.buy} />
            </div>
          </div>
        </div>
      );
  }

  function BottomSection() {
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
          <div className={styles.block}>{renderBtnTrainNature()}</div>
        </div>
      );
  }

  if (bdCard === null) {
    return (
      <div className={styles.top}>
        <div className={styles.top_section}>
          <div className={styles.name}>{currentCard.name}</div>
          <div className={styles.mini_btns}>
            <button className={styles.mini_btn} onClick={() => setOpenIndex(-1)}>
              <X size={16} color="#ffffff" />
            </button>
          </div>
        </div>
        <div className={styles.desc}>{currentCard.desc}</div>
      </div>
    );
  }

  if (currentCard.class === "street") {
    return (
      <div className={styles.card}>
        <Top />
        <div className={styles.bottom}>
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
          <Table list={statusStreet} />

          <div className={styles.bottom_section}>
            <div className={styles.block}>
              <div className={styles.money}>
                <Unlock size={16} color="#ffffff" />
                <Money value={currentCard.unlock} />
              </div>
              <div className={styles.money}>
                <Home size={16} color="#ffffff" />
                <Money value={currentCard.build} />
              </div>
              {bdCard.owner && (
                <div
                  className={styles.owner}
                  style={{
                    backgroundColor: GetFigureFromSelected(
                      GetPlayerFromId(players, bdCard.owner)!,
                    ).bg,
                    color: GetFigureFromSelected(
                      GetPlayerFromId(players, bdCard.owner)!,
                    ).color,
                  }}
                >
                  {GetPlayerFromId(players, bdCard.owner)!.user?.name}
                </div>
              )}
            </div>
            <div className={styles.block}>{renderBtnStreet()}</div>
          </div>
        </div>
      </div>
    );
  }

  if (currentCard.class === "train") {
    return (
      <div className={styles.card}>
        <Top />
        <div className={styles.bottom}>
          <div className={styles.group}>
            {imagesTrain.map((el, i) => {
              return <Image key={i} src={el} alt={el} />;
            })}
          </div>
          <Table list={statusTrain} />
          <BottomSection />
        </div>
      </div>
    );
  }

  if (currentCard.class === "nature") {
    return (
      <div className={styles.card}>
        <Top />
        <div className={styles.bottom}>
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
          <Table list={statusNature} />
          <div className={styles.table}>
            <Image src={currentCard.svg} alt={currentCard.name} />
            <div className={styles.rent}>
              {statusNature.map((el, index) => {
                return (
                  <div
                    key={index}
                    className={
                      index === bdCard.status && !bdCard.mortgage
                        ? styles.status + " " + styles.status_active
                        : styles.status
                    }
                  >
                    <div className={styles.status_title}>{el}</div>
                    <div className={styles.money}>
                      x{currentCard.rent[index]}
                      <Dices size={14} color="#ffffff" />
                    </div>
                  </div>
                );
              })}
            </div>
            <Third />
          </div>
          <BottomSection />
        </div>
      </div>
    );
  }

  return <div></div>;
}
