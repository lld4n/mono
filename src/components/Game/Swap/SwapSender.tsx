import { PlayersGetType } from "@/types/PlayersGetType";
import { CardsGetType } from "@/types/CardsGetType";
import React, { useState } from "react";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import styles from "./Swap.module.scss";
import { figuresList } from "@/constants/figures";
import { ArrowLeftRight, X } from "lucide-react";
import IconButton from "@/components/Buttons/IconButton/IconButton";
import { cardsList } from "@/constants/cards";
import Image from "next/image";
import Money from "@/components/Game/Money/Money";
import { useSwaps } from "@/hooks/useSwaps";
import MiniButton from "@/components/Buttons/MiniButton/MiniButton";

type PropsType = {
  players: PlayersGetType[];
  cards: CardsGetType[];
  setOpenSwap: React.Dispatch<React.SetStateAction<boolean>>;
  currentPlayer: Doc<"players">;
};

export default function SwapSender({
  players,
  cards,
  setOpenSwap,
  currentPlayer,
}: PropsType) {
  const [recipient, setRecipient] = useState<PlayersGetType>();

  const [senderMoney, setSenderMoney] = useState<number>(0);
  const [recipientMoney, setRecipientMoney] = useState<number>(0);

  const [senderCards, setSenderCards] = useState<Id<"cards">[]>([]);
  const [recipientCards, setRecipientCards] = useState<Id<"cards">[]>([]);

  const { toastCreateSwaps } = useSwaps();

  function chooseSender(cardId: Id<"cards">) {
    console.log(cardId);
    console.log(senderCards, recipientCards);
    if (senderCards?.includes(cardId)) {
      const buffer = senderCards.filter((card) => card !== cardId);
      setSenderCards(buffer);
    } else {
      const buffer = senderCards;
      buffer.push(cardId);
      setSenderCards(buffer);
    }
  }

  function chooseRecipient(cardId: Id<"cards">) {
    console.log(cardId);
    if (recipientCards?.includes(cardId)) {
      const buffer = recipientCards.filter((card) => card !== cardId);
      setRecipientCards(buffer);
    } else {
      const buffer = recipientCards;
      buffer.push(cardId);
      setRecipientCards(buffer);
    }
  }

  function start() {
    toastCreateSwaps(
      currentPlayer.games_id,
      currentPlayer._id,
      recipient?._id!,
      senderMoney,
      recipientMoney,
      senderCards,
      recipientCards,
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h1 className={styles.head}>Обмен</h1>
        <IconButton onClick={() => setOpenSwap(false)}>
          <X size={16} color="#ffffff" />
        </IconButton>
      </div>
      {!recipient && (
        <div className={styles.choose}>
          <span className={styles.chooseText}>Выберите, с кем хотите обменяться</span>
          {players
            .filter((player) => !player.loser && player._id !== currentPlayer._id)
            .map((player) => (
              <div
                key={player._id}
                style={{
                  backgroundColor: figuresList[player.selected].bg,
                  borderRadius: 5,
                  width: 20,
                  height: 20,
                  cursor: "pointer",
                }}
                onClick={() => setRecipient(player)}
              ></div>
            ))}
        </div>
      )}

      {recipient && (
        <div className={styles.swap}>
          <div key={currentPlayer._id} className={styles.sender}>
            <div
              style={{
                backgroundColor: figuresList[currentPlayer.selected].bg,
                width: 40,
                height: 10,
                borderRadius: 5,
              }}
            ></div>
            <div className={styles.info}>
              {cards
                .filter((card) => {
                  if (card?.owner === currentPlayer._id) {
                    if (cardsList[card.index].class === "street" && card.status !== 0)
                      return false;
                    return true;
                  }
                  return false;
                })
                .map((card) => (
                  <>
                    {card && (
                      <IconButton
                        key={card._id}
                        className={
                          senderCards.includes(card._id) ? styles.chosenCard : ""
                        }
                        onClick={() => chooseSender(card._id)}
                      >
                        <Image src={cardsList[card.index].svg} alt={"card"} />
                      </IconButton>
                    )}
                  </>
                ))}
            </div>
            <input
              type="number"
              className={styles.input}
              value={senderMoney !== 0 ? senderMoney : ""}
              onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSenderMoney(+event.target.value)
              }
              placeholder={"Сумма ✦"}
            />
          </div>
          <IconButton>
            <ArrowLeftRight size={16} color={"#ffffff"} />
          </IconButton>
          {players
            .filter((player) => recipient._id === player._id)
            .map((player) => (
              <div key={player._id} className={styles.recipient}>
                <div
                  style={{
                    backgroundColor: figuresList[player.selected].bg,
                    width: 40,
                    height: 10,
                    borderRadius: 5,
                  }}
                ></div>
                <div className={styles.info}>
                  {cards
                    .filter((card) => {
                      if (card?.owner === player._id) {
                        if (
                          cardsList[card.index].class === "street" &&
                          card.status !== 0
                        )
                          return false;
                        return true;
                      }
                      return false;
                    })
                    .map((card) => (
                      <>
                        {card && (
                          <IconButton
                            key={card._id}
                            className={
                              recipientCards.includes(card._id) ? styles.chosenCard : ""
                            }
                            onClick={() => chooseRecipient(card._id)}
                          >
                            <Image src={cardsList[card.index].svg} alt={"card"} />
                          </IconButton>
                        )}
                      </>
                    ))}
                </div>
                <input
                  type="number"
                  className={styles.input}
                  value={recipientMoney !== 0 ? recipientMoney : ""}
                  onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setRecipientMoney(+event.target.value)
                  }
                  placeholder={"Сумма ✦"}
                />
              </div>
            ))}
        </div>
      )}
      {recipient && (
        <MiniButton
          className={
            (senderCards.length !== 0 || senderMoney !== 0) &&
            (recipientCards.length !== 0 || recipientMoney !== 0)
              ? styles.send
              : styles.disabled
          }
          onClick={
            (senderCards.length !== 0 || senderMoney !== 0) &&
            (recipientCards.length !== 0 || recipientMoney !== 0)
              ? () => start()
              : () => console.log()
          }
        >
          Отправить
        </MiniButton>
      )}
    </div>
  );
}
