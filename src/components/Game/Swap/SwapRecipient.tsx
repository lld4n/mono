import { Doc } from "../../../../convex/_generated/dataModel";
import { PlayersGetType } from "@/types/PlayersGetType";
import { useSwaps } from "@/hooks/useSwaps";
import { cardsList } from "@/constants/cards";
import { figuresList } from "@/constants/figures";
import styles from "./Swap.module.scss";
import PlayerTimer from "@/components/Game/PlayerTimer/PlayerTimer";
import MiniButton from "@/components/Buttons/MiniButton/MiniButton";
import { CardsGetType } from "@/types/CardsGetType";
import Image from "next/image";
import Money from "@/components/Game/Money/Money";
import IconButton from "@/components/Buttons/IconButton/IconButton";
import { ArrowLeftRight } from "lucide-react";

type PropsType = {
  swap: Doc<"swaps">;
  currentPlayer: Doc<"players">;
  players: PlayersGetType[];
  cards: CardsGetType[];
};

export default function SwapRecipient({
  swap,
  currentPlayer,
  players,
  cards,
}: PropsType) {
  const { toastRefuse, toastConcur } = useSwaps();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.head}>Тебе предложили обмен</h1>
      <div className={styles.swap}>
        {players
          .filter((player) => swap.sender === player._id)
          .map((player) => (
            <div key={player._id} className={styles.sender}>
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
                    if (
                      card?.owner === player._id &&
                      swap.sender_cards.includes(card._id)
                    ) {
                      if (cardsList[card.index].class === "street" && card.status !== 0)
                        return false;
                      return true;
                    }
                    return false;
                  })
                  .map((card) => (
                    <>
                      {card && (
                        <div key={card._id} className={styles.card}>
                          <Image src={cardsList[card.index].svg} alt={"card"} />
                        </div>
                      )}
                    </>
                  ))}
                {swap.sender_money !== 0 && <Money value={swap.sender_money} />}
              </div>
            </div>
          ))}
        <IconButton>
          <ArrowLeftRight size={16} color={"#ffffff"} />
        </IconButton>
        <div key={currentPlayer._id} className={styles.recipient}>
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
                if (
                  card?.owner === currentPlayer._id &&
                  swap.recipient_cards.includes(card._id)
                ) {
                  if (cardsList[card.index].class === "street" && card.status !== 0)
                    return false;
                  return true;
                }
                return false;
              })
              .map((card) => (
                <>
                  {card && (
                    <IconButton key={card._id} className={styles.card}>
                      <Image src={cardsList[card.index].svg} alt={"card"} />
                    </IconButton>
                  )}
                </>
              ))}
            {swap.recipient_money !== 0 && <Money value={swap.recipient_money} />}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.timer}>
          <PlayerTimer timer={swap.timer} />
        </div>
        <MiniButton onClick={() => toastRefuse(swap._id)}>Отказаться</MiniButton>
        <MiniButton onClick={() => toastConcur(swap._id)}>Принять</MiniButton>
      </div>
    </div>
  );
}
