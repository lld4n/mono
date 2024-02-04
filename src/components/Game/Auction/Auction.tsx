import { Doc } from "../../../../convex/_generated/dataModel";
import { CardsGetType } from "@/types/CardsGetType";
import { PlayersGetType } from "@/types/PlayersGetType";
import styles from "./Auction.module.scss";
import Image from "next/image";
import { cardsList } from "@/constants/cards";
import PlayerTimer from "@/components/Game/PlayerTimer/PlayerTimer";
import MiniButton from "@/components/Buttons/MiniButton/MiniButton";
import Money from "@/components/Game/Money/Money";
import { figuresList } from "@/constants/figures";
import { useAuctions } from "@/hooks/useAuctions";

type PropsType = {
  auction: Doc<"auctions">;
  currentPlayer: Doc<"players">;
  cards: CardsGetType[];
  players: PlayersGetType[];
};

export default function Auction({ auction, currentPlayer, cards, players }: PropsType) {
  const { toastCreateAuction, toastUpdate } = useAuctions();

  return (
    <div className={styles.wrapper}>
      {auction.money <= 0 && !auction.players_id && (
        <div className={styles.auction}>
          <h1 className={styles.head}>Аукцион</h1>
          <div className={styles.info}>
            {cards.map((card) => {
              if (card && card._id === auction.cards_id)
                return <Image src={cardsList[card.index].svg} alt={"card"}></Image>;
            })}
          </div>
          <div className={styles.bottom}>
            <PlayerTimer timer={auction.timer} />
            {currentPlayer.balance >= auction.money && (
              <MiniButton onClick={() => toastUpdate(auction._id, currentPlayer._id)}>
                Установить ставку на <Money value={100} />
              </MiniButton>
            )}
          </div>
        </div>
      )}
      {auction.money > 0 && auction.players_id && (
        <div className={styles.auction}>
          <h1 className={styles.head}>Аукцион</h1>

          <div className={styles.info}>
            {cards.map((card) => {
              if (card && card._id === auction.cards_id)
                return <Image src={cardsList[card.index].svg} alt={"card"}></Image>;
            })}
            {players.map((player) => {
              if (player._id === auction.players_id)
                return (
                  <div
                    className={styles.figure}
                    style={{
                      backgroundColor: figuresList[player.selected].bg,
                    }}
                  ></div>
                );
            })}
            <div className={styles.money}>
              <Money value={auction.money} />
            </div>
          </div>

          <div className={styles.bottom}>
            <PlayerTimer timer={auction.timer} />
            {currentPlayer.balance >= auction.money && (
              <MiniButton onClick={() => toastUpdate(auction._id, currentPlayer._id)}>
                Поднять ставку на <Money value={100} />
              </MiniButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
