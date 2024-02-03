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

type PropsType = {
  players: PlayersGetType[];
  currentPlayer: Doc<"players">;
  cards: CardsGetType[];
  game: Doc<"games">;
  setOpenIndex: React.Dispatch<React.SetStateAction<number>>;
  openIndex: number;
};

export default function Center({
  players,
  currentPlayer,
  cards,
  game,
  setOpenIndex,
  openIndex,
}: PropsType) {
  const [finishActions, setFinishActions] = React.useState(false);
  const [convexCard, setConvexCard] = React.useState<CardsGetType>();
  const [getMoneyPlayer, setGetMoneyPlayer] = React.useState<Id<"players">>();

  const [buyState, setBuyState] = React.useState(0);
  const [payState, setPayState] = React.useState(0);
  const [luckyState, setLuckyState] = React.useState(false);
  const [natureState, setNatureState] = React.useState(0);

  const { toastLose, toastUpdatePosition, toastUpdateBalance } = usePlayers();
  const { toastUpdateCurrent, toastUpdateTimer } = useGames();
  const { toastBuy } = useCards();

  React.useEffect(() => {
    if (game.current !== currentPlayer._id && finishActions) {
      setFinishActions(false);
    }
  }, [game]);

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
    setConvexCard(undefined);
    setGetMoneyPlayer(undefined);
    setLuckyState(false);
    // тестовая тема
    toastUpdateCurrent(game._id);
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
      // тестовая тема
      toastUpdateCurrent(game._id);
    }
  };

  return (
    <div className={styles.center}>
      {game.current === currentPlayer._id &&
        !finishActions &&
        buyState === 0 &&
        payState === 0 &&
        !luckyState &&
        natureState === 0 && <RollDice rolling={baseRoll} />}

      {buyState !== 0 && (
        <Buy
          onBuy={baseBuy}
          money={buyState}
          currentPlayer={currentPlayer}
          generalBalance={GetGeneralBalance(currentPlayer, cards)}
          onAuction={baseAuction}
        />
      )}
      {payState !== 0 && (
        <Pay
          onPay={basePay}
          money={payState}
          currentPlayer={currentPlayer}
          generalBalance={GetGeneralBalance(currentPlayer, cards)}
          onLose={baseLose}
        />
      )}
      {luckyState && <Lucky onChoice={baseLucky} />}
      {natureState !== 0 && <RollDice rolling={baseNature} />}
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
