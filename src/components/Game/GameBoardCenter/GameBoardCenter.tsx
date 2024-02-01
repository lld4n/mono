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
import LuckyComponent, {
  choiceType,
} from "@/components/Game/LuckyComponent/LuckyComponent";
import RollDice, { RollDiceType } from "@/components/Game/Roll Dice/RollDice";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { cardsList } from "@/constants/cards";

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
  const [convexCard, setConvexCard] = React.useState<CardsGetType>();
  const [buyState, setBuyState] = React.useState(0);
  const [payState, setPayState] = React.useState(0);
  const [luckyState, setLuckyState] = React.useState(false);
  const [natureState, setNatureState] = React.useState(0);

  const updateBalance = useMutation(api.players.updateBalance);
  const updatePosition = useMutation(api.players.updatePosition);
  const updateTimer = useMutation(api.games.updateTimer);
  const updateCurrent = useMutation(api.games.updateCurrent);
  const buy = useMutation(api.cards.buy);
  console.log(players);
  const baseBuy = async (m: number) => {
    setBuyState(0);
    if (!convexCard) return;
    await buy({
      cards_id: convexCard._id,
      players_id: currentPlayer._id,
      money: m,
    });
    await updateCurrent({
      games_id: game._id,
    });
    setConvexCard(undefined);
  };

  const basePay = async (m: number) => {
    setPayState(0);
    await updateBalance({
      players_id: currentPlayer._id,
      money: -m,
    });
    await updateCurrent({
      games_id: game._id,
    });
    setConvexCard(undefined);
  };

  const baseLucky = async (choice: choiceType) => {
    setLuckyState(false);
    await updateTimer({
      games_id: game._id,
    });
    if (choice.type === "pay") {
      setPayState(choice.value);
    } else if (choice.type === "get") {
      await updateBalance({
        players_id: currentPlayer._id,
        money: choice.value,
      });
      await updateCurrent({
        games_id: game._id,
      });
    }
    setConvexCard(undefined);
  };

  const baseNature = async (r: RollDiceType) => {
    await updateTimer({
      games_id: game._id,
    });
    setPayState((r[0] + r[1]) * natureState);
    setNatureState(0);
    setConvexCard(undefined);
  };
  const baseRoll = async (r: RollDiceType) => {
    const curPosition = currentPlayer.position + r[0] + r[1];
    if (curPosition > 39) {
      await updateBalance({
        players_id: currentPlayer._id,
        money: 1000,
      });
    }
    await updatePosition({
      players_id: currentPlayer._id,
      position: curPosition % 40,
    });
    await updateTimer({
      games_id: game._id,
    });
    const bdCard = cards[curPosition % 40];
    if (!bdCard) return;
    setConvexCard(bdCard);
    const currentCard = cardsList[curPosition % 40];
    if (currentCard.class === "street" || currentCard.class === "train") {
      if (bdCard.mortgage) {
        await updateCurrent({
          games_id: game._id,
        });
      } else if (bdCard.owner === currentPlayer._id) {
        await updateCurrent({
          games_id: game._id,
        });
      } else if (bdCard.owner === undefined) {
        setBuyState(currentCard.buy);
      } else {
        setPayState(currentCard.rent[bdCard.status]);
      }
    } else if (currentCard.class === "nature") {
      if (bdCard.mortgage) {
        await updateCurrent({
          games_id: game._id,
        });
      } else if (bdCard.owner === currentPlayer._id) {
        await updateCurrent({
          games_id: game._id,
        });
      } else if (bdCard.owner === undefined) {
        setBuyState(currentCard.buy);
      } else {
        setNatureState(currentCard.rent[bdCard.status]);
      }
    } else if (currentCard.class === "lucky") {
      setLuckyState(true);
    } else if (currentCard.class === "tax") {
      setPayState(currentCard.pay);
    } else if (currentCard.class === "empty") {
      await updateCurrent({
        games_id: game._id,
      });
    } else {
      // тестовая тема
      await updateCurrent({
        games_id: game._id,
      });
    }
  };

  return (
    <div className={styles.center}>
      {game.current === currentPlayer._id &&
        buyState === 0 &&
        payState === 0 &&
        !luckyState &&
        natureState === 0 && <RollDice rolling={baseRoll} />}

      {buyState !== 0 && (
        <BuyComponent
          onBuy={baseBuy}
          money={buyState}
          game={game}
          currentPlayer={currentPlayer}
          generalBalance={GetGeneralBalance(currentPlayer, cards)}
        />
      )}
      {payState !== 0 && (
        <PayComponent
          onPay={basePay}
          money={payState}
          currentPlayer={currentPlayer}
          generalBalance={GetGeneralBalance(currentPlayer, cards)}
        />
      )}
      {luckyState && (
        <LuckyComponent onChoice={(choice) => console.log(choice)} />
      )}
      {natureState !== 0 && <RollDice rolling={baseNature} />}
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
