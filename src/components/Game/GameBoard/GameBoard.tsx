import styles from "./GameBoard.module.scss";
import { PlayersGetType } from "@/types/PlayersGetType";
import { Doc } from "../../../../convex/_generated/dataModel";
import { CardsGetType } from "@/types/CardsGetType";
import GameBoardCardItem from "@/components/Game/GameBoardCardItem/GameBoardCardItem";
import GameBoardCenter from "@/components/Game/GameBoardCenter/GameBoardCenter";
import { useState } from "react";

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
  const [openCard, setOpenCard] = useState<number>(-1);

  const indexes = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 39, -1, 11, 38, 12, 37, 13, 36, 14, 35,
    15, 34, 16, 33, 17, 32, 18, 31, 19, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20,
  ];
  return (
    <div className={styles.grid}>
      {indexes.map((cardIndex) => {
        if (cardIndex === -1)
          return (
            <GameBoardCenter
              players={players}
              cards={cards}
              game={game}
              currentPlayer={currentPlayer}
              openIndex={openCard}
              setOpenIndex={setOpenCard}
            />
          );
        return (
          <GameBoardCardItem
            index={cardIndex}
            key={cardIndex}
            players={players}
            cards={cards}
            setOpenIndex={setOpenCard}
          />
        );
      })}
    </div>
  );
}
