import styles from "./GameBoardCenter.module.scss";
import Chat from "@/components/Global/Chat/Chat";
import { Doc } from "../../../../convex/_generated/dataModel";
import { PlayersGetType } from "@/types/PlayersGetType";
import { CardsGetType } from "@/types/CardsGetType";
import React from "react";
import GameBoardCardInfo from "@/components/Game/GameBoardCardInfo/GameBoardCardInfo";
import PayComponent from "@/components/Game/PayComponent/PayComponent";
import { GetGeneralBalance } from "@/utils/GetGeneralBalance";
import BuyComponent from "@/components/Game/BuyComponent/BuyComponent";

type PropsType = {
  players: PlayersGetType[];
  currentPlayer: Doc<"players">;
  cards: CardsGetType[];
  game: Doc<"games">;
  setOpenIndex: React.Dispatch<React.SetStateAction<number>>;
  openIndex: number;
};

export default function GameBoardCenter({
  players,
  currentPlayer,
  cards,
  game,
  setOpenIndex,
  openIndex,
}: PropsType) {
  return (
    <div className={styles.center}>
      <PayComponent
        onPay={(m) => console.log("выполнено" + m)}
        money={1500}
        currentPlayer={currentPlayer}
        generalBalance={GetGeneralBalance(currentPlayer, cards)}
      />
      <BuyComponent
        onBuy={(m) => console.log("вфполнен")}
        money={1200}
        game={game}
        currentPlayer={currentPlayer}
        generalBalance={GetGeneralBalance(currentPlayer, cards)}
      />
      {openIndex !== -1 && (
        <GameBoardCardInfo
          players={players}
          cards={cards}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
          currentPlayer={currentPlayer}
        />
      )}
      <Chat
        players={players}
        games_id={game._id}
        playerId={currentPlayer._id}
      />
    </div>
  );
}
