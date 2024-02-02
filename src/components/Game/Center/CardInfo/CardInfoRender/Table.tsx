import styles from "./CardInfoRender.module.scss";
import Image from "next/image";
import Money from "@/components/Game/Money/Money";
import { CardsGetType } from "@/types/CardsGetType";
import { CardListType } from "@/types/card/CardListType";
import { ShoppingCart, Lock } from "lucide-react";
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
export default function Table({
  bdCard,
  currentCard,
}: {
  bdCard: CardsGetType;
  currentCard: CardListType;
}) {
  let list;
  if (currentCard.class === "street") {
    list = statusStreet;
  } else if (currentCard.class === "train") {
    list = statusTrain;
  } else {
    list = statusNature;
  }
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
      </div>
    );

  return "";
}
