import styles from "./Center.module.scss";
import Chat from "@/components/Chat/Chat";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { PlayersGetType } from "@/types/PlayersGetType";
import { CardsGetType } from "@/types/CardsGetType";
import React from "react";
import CardInfo from "@/components/Game/Center/CardInfo/CardInfo";
import Pay from "@/components/Game/Center/Pay/Pay";
import { GetGeneralBalance } from "@/utils/GetGeneralBalance";
import Buy from "@/components/Game/Center/Buy/Buy";
import Lucky, { choiceType } from "@/components/Game/Center/Lucky/Lucky";
import RollDice, { RollDiceType } from "@/components/Game/Center/RollDice/RollDice";
import { cardsList } from "@/constants/cards";
import { useCards } from "@/hooks/useCards";
import { usePlayers } from "@/hooks/usePlayers";
import { useGames } from "@/hooks/useGames";
import { useAuctions } from "@/hooks/useAuctions";

import Jail from "@/components/Game/Center/Jail/Jail";
import SwapRecipient from "@/components/Game/Swap/SwapRecipient";
import SwapSender from "@/components/Game/Swap/SwapSender";
import Auction from "@/components/Game/Auction/Auction";

type PropsType = {
  players: PlayersGetType[];
  currentPlayer: Doc<"players">;
  cards: CardsGetType[];
  game: Doc<"games">;
  setOpenIndex: React.Dispatch<React.SetStateAction<number>>;
  openIndex: number;
  swap: Doc<"swaps"> | null;
  openSwap: boolean;
  setOpenSwap: React.Dispatch<React.SetStateAction<boolean>>;
  auction: Doc<"auctions"> | null;
};

export default function Center({
  players,
  currentPlayer,
  cards,
  game,
  setOpenIndex,
  openIndex,
  swap,
  openSwap,
  setOpenSwap,
  auction,
}: PropsType) {
  const [finishActions, setFinishActions] = React.useState(false);
  const [convexCard, setConvexCard] = React.useState<CardsGetType>();
  const [getMoneyPlayer, setGetMoneyPlayer] = React.useState<Id<"players">>();

  const [buyState, setBuyState] = React.useState(0);
  const [payState, setPayState] = React.useState(0);
  const [luckyState, setLuckyState] = React.useState(false);
  const [natureState, setNatureState] = React.useState(0);
  const [tryState, setTryState] = React.useState(false);

  const {
    toastLose,
    toastUpdatePosition,
    toastUpdateBalance,
    toastExitJail,
    toastGoJail,
    toastUpdateTries,
  } = usePlayers();
  const { toastUpdateCurrent, toastUpdateTimer } = useGames();
  const { toastBuy } = useCards();

  const { toastCreateAuction } = useAuctions();

  React.useEffect(() => {
    if (game.current !== currentPlayer._id && finishActions) {
      setFinishActions(false);
    }
  }, [game]);

  const baseTry = (r: RollDiceType) => {
    toastUpdateCurrent(game._id);
    if (r[0] === r[1]) {
      toastExitJail(currentPlayer._id);
    } else {
      toastUpdateTries(currentPlayer._id);
    }
    setTryState(false);
  };

  const basePayJail = () => {
    toastUpdateTimer(game._id);
    setPayState(500);
  };
  const baseLose = () => {
    setPayState(0);
    setBuyState(0);
    setNatureState(0);
    setConvexCard(undefined);
    setGetMoneyPlayer(undefined);
    setLuckyState(false);
    toastLose(currentPlayer._id);
  };
  const baseAuction = () => {
    setPayState(0);
    setBuyState(0);
    setNatureState(0);
    toastCreateAuction(game._id, convexCard?._id!); //тут не очень уверен
    setConvexCard(undefined);
    setGetMoneyPlayer(undefined);
    setLuckyState(false);
  };
  const baseBuy = (m: number) => {
    setBuyState(0);
    if (!convexCard) return;
    toastBuy(convexCard._id, currentPlayer._id, m);
    toastUpdateCurrent(game._id);
    setConvexCard(undefined);
  };

  const basePay = (m: number) => {
    setPayState(0);
    setConvexCard(undefined);
    toastUpdateBalance(currentPlayer._id, -m);
    if (getMoneyPlayer) toastUpdateBalance(getMoneyPlayer, m);
    if (currentPlayer.jail) toastExitJail(currentPlayer._id);
    toastUpdateCurrent(game._id);
    setGetMoneyPlayer(undefined);
  };

  const baseLucky = (choice: choiceType) => {
    setLuckyState(false);
    setConvexCard(undefined);
    toastUpdateTimer(game._id);
    if (choice.type === "pay") {
      setPayState(choice.value);
    } else if (choice.type === "get") {
      toastUpdateBalance(currentPlayer._id, choice.value);
      toastUpdateCurrent(game._id);
    }
  };

  const baseNature = (r: RollDiceType) => {
    toastUpdateTimer(game._id);
    setPayState((r[0] + r[1]) * natureState);
    setGetMoneyPlayer(convexCard?.owner);
    setNatureState(0);
    setConvexCard(undefined);
  };

  const baseRoll = (r: RollDiceType) => {
    const curPosition = currentPlayer.position + r[0] + r[1];
    if (curPosition > 39) toastUpdateBalance(currentPlayer._id, 1000);
    toastUpdatePosition(currentPlayer._id, curPosition % 40);
    toastUpdateTimer(game._id);

    setFinishActions(true);

    const bdCard = cards[curPosition % 40];
    setConvexCard(bdCard);
    const currentCard = cardsList[curPosition % 40];
    if (currentCard.class === "street" || currentCard.class === "train") {
      if (bdCard!.mortgage || bdCard!.owner === currentPlayer._id) {
        toastUpdateCurrent(game._id);
      } else if (bdCard!.owner === undefined) {
        setBuyState(currentCard.buy);
      } else {
        setPayState(currentCard.rent[bdCard!.status]);
        setGetMoneyPlayer(bdCard!.owner);
      }
    } else if (currentCard.class === "nature") {
      if (bdCard!.mortgage || bdCard!.owner === currentPlayer._id) {
        toastUpdateCurrent(game._id);
      } else if (bdCard!.owner === undefined) {
        setBuyState(currentCard.buy);
      } else {
        setNatureState(currentCard.rent[bdCard!.status]);
      }
    } else if (currentCard.class === "lucky") {
      setLuckyState(true);
    } else if (currentCard.class === "tax") {
      setPayState(currentCard.pay);
    } else if (currentCard.class === "empty") {
      toastUpdateCurrent(game._id);
    } else {
      toastGoJail(currentPlayer._id);
      toastUpdateCurrent(game._id);
    }
  };

  return (
    <div className={styles.center}>
      {swap && currentPlayer._id === swap.recipient && (
        <SwapRecipient
          swap={swap}
          players={players}
          cards={cards}
          currentPlayer={currentPlayer}
        />
      )}
      {openSwap && (
        <SwapSender
          players={players}
          cards={cards}
          currentPlayer={currentPlayer}
          setOpenSwap={setOpenSwap}
        />
      )}
      {auction && (
        <Auction
          players={players}
          cards={cards}
          currentPlayer={currentPlayer}
          auction={auction}
        />
      )}
      {game.current === currentPlayer._id &&
        !finishActions &&
        !currentPlayer.jail &&
        buyState === 0 &&
        payState === 0 &&
        !luckyState &&
        !auction &&
        natureState === 0 && <RollDice rolling={baseRoll} />}
      {game.current === currentPlayer._id &&
        currentPlayer.jail &&
        !tryState &&
        !auction &&
        payState === 0 && (
          <Jail
            onPayJail={basePayJail}
            onTry={() => setTryState(true)}
            currentPlayer={currentPlayer}
          />
        )}
      {tryState && <RollDice rolling={baseTry} />}

      {buyState !== 0 && !currentPlayer.jail && !auction && (
        <Buy
          onBuy={baseBuy}
          money={buyState}
          currentPlayer={currentPlayer}
          generalBalance={GetGeneralBalance(currentPlayer, cards)}
          onAuction={baseAuction}
        />
      )}
      {payState !== 0 && !swap && !auction && (
        <Pay
          onPay={basePay}
          money={payState}
          currentPlayer={currentPlayer}
          generalBalance={GetGeneralBalance(currentPlayer, cards)}
          onLose={baseLose}
        />
      )}
      {luckyState && !currentPlayer.jail && !auction && <Lucky onChoice={baseLucky} />}
      {natureState !== 0 && !currentPlayer.jail && !auction && (
        <RollDice rolling={baseNature} />
      )}
      {openIndex !== -1 && (
        <CardInfo
          players={players}
          cards={cards}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
          currentPlayer={currentPlayer}
          game={game}
        />
      )}
      <Chat players={players} games_id={game._id} playerId={currentPlayer._id} />
    </div>
  );
}
