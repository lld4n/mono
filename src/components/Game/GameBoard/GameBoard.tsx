import styles from "./GameBoard.module.scss";
import { PlayersGetType } from "@/types/PlayersGetType";
import { Doc } from "../../../../convex/_generated/dataModel";
import { CardsGetType } from "@/types/CardsGetType";
import GameBoardCardItem from "@/components/Game/GameBoardCardItem/GameBoardCardItem";

type PropsType = {
  players: PlayersGetType[];
  game: Doc<"games">;
  cards: CardsGetType[];
  currentPlayer: Doc<"players">;
};
export default function GameBoard({
  cards,
  players,
  game,
  currentPlayer,
}: PropsType) {
  return (
    <div className={styles.grid}>
      {cards &&
        cards.map((card) => {
          return (
            <>
              {card && (
                <div className={styles.card} key={card.index}>
                  <GameBoardCardItem index={card.index} />
                </div>
              )}
            </>
          );
        })}
    </div>
  );
}
