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
import { toast } from "sonner";

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
  const [finishActions, setFinishActions] = React.useState(false);
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
  const lose = useMutation(api.players.lose);

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
    setLuckyState(false);
    toast.promise(
      lose({
        players_id: currentPlayer._id,
      }),
      {
        loading: "Обнуляем игрока, который сейчас ходил",
        success: "Игрок, который сейчас ходил проиграл",
        error: (error) => error,
      },
    );
  };
  const baseAuction = () => {
    setPayState(0);
    setBuyState(0);
    setNatureState(0);
    setConvexCard(undefined);
    setLuckyState(false);
    toast.promise(
      updateCurrent({
        games_id: game._id,
      }),
      {
        loading: "Определяем следующего игрока",
        success: "Следующий игрок определен",
        error: (error) => error,
      },
    );
  };
  const baseBuy = (m: number) => {
    setBuyState(0);
    if (!convexCard) return;
    toast.promise(
      buy({
        cards_id: convexCard._id,
        players_id: currentPlayer._id,
        money: m,
      }),
      {
        loading: "Покупаем карточку",
        success: "Карточка куплена",
        error: (error) => error,
      },
    );
    toast.promise(
      updateCurrent({
        games_id: game._id,
      }),
      {
        loading: "Определяем следующего игрока",
        success: "Игрок определен",
        error: (error) => error,
      },
    );
    setConvexCard(undefined);
  };

  const basePay = (m: number) => {
    setPayState(0);
    toast.promise(
      updateBalance({
        players_id: currentPlayer._id,
        money: -m,
      }),
      {
        loading: "Обновляем баланс игрока",
        success: "Баланс обновлен",
        error: (error) => error,
      },
    );
    toast.promise(
      updateCurrent({
        games_id: game._id,
      }),
      {
        loading: "Определяем следующего игрока",
        success: "Игрок определен",
        error: (error) => error,
      },
    );
    setConvexCard(undefined);
  };

  const baseLucky = (choice: choiceType) => {
    setLuckyState(false);
    toast.promise(
      updateTimer({
        games_id: game._id,
      }),
      {
        loading: "Обновляем таймер",
        success: "Таймер обновлен",
        error: (error) => error,
      },
    );
    if (choice.type === "pay") {
      setPayState(choice.value);
    } else if (choice.type === "get") {
      toast.promise(
        updateBalance({
          players_id: currentPlayer._id,
          money: choice.value,
        }),
        {
          loading: "Обновляем баланс игрока",
          success: "Баланс обновлен",
          error: (error) => error,
        },
      );
      toast.promise(
        updateCurrent({
          games_id: game._id,
        }),
        {
          loading: "Определяем следующего игрока",
          success: "Игрок определен",
          error: (error) => error,
        },
      );
    }
    setConvexCard(undefined);
  };

  const baseNature = (r: RollDiceType) => {
    toast.promise(
      updateTimer({
        games_id: game._id,
      }),
      {
        loading: "Обновляем таймер",
        success: "Таймер обновлен",
        error: (error) => error,
      },
    );
    setPayState((r[0] + r[1]) * natureState);
    setNatureState(0);
    setConvexCard(undefined);
  };

  const baseRoll = (r: RollDiceType) => {
    const curPosition = currentPlayer.position + r[0] + r[1];
    if (curPosition > 39) {
      toast.promise(
        updateBalance({
          players_id: currentPlayer._id,
          money: 1000,
        }),
        {
          loading: "Обновляем баланс игрока",
          success: "Баланс обновлен",
          error: (error) => error,
        },
      );
    }
    toast.promise(
      updatePosition({
        players_id: currentPlayer._id,
        position: curPosition % 40,
      }),
      {
        loading: "Обновляем позицию игрока",
        success: "Позиция обновлена",
        error: (error) => error,
      },
    );
    toast.promise(
      updateTimer({
        games_id: game._id,
      }),
      {
        loading: "Обновляем таймер",
        success: "Таймер обновлен",
        error: (error) => error,
      },
    );
    const bdCard = cards[curPosition % 40];
    setConvexCard(bdCard);
    const currentCard = cardsList[curPosition % 40];
    if (currentCard.class === "street" || currentCard.class === "train") {
      if (bdCard!.mortgage) {
        toast.promise(
          updateCurrent({
            games_id: game._id,
          }),
          {
            loading: "Определяем следующего игрока",
            success: "Игрок определен",
            error: (error) => error,
          },
        );
      } else if (bdCard!.owner === currentPlayer._id) {
        toast.promise(
          updateCurrent({
            games_id: game._id,
          }),
          {
            loading: "Определяем следующего игрока",
            success: "Игрок определен",
            error: (error) => error,
          },
        );
      } else if (bdCard!.owner === undefined) {
        setBuyState(currentCard.buy);
      } else {
        setPayState(currentCard.rent[bdCard!.status]);
      }
    } else if (currentCard.class === "nature") {
      if (bdCard!.mortgage) {
        toast.promise(
          updateCurrent({
            games_id: game._id,
          }),
          {
            loading: "Определяем следующего игрока",
            success: "Игрок определен",
            error: (error) => error,
          },
        );
      } else if (bdCard!.owner === currentPlayer._id) {
        toast.promise(
          updateCurrent({
            games_id: game._id,
          }),
          {
            loading: "Определяем следующего игрока",
            success: "Игрок определен",
            error: (error) => error,
          },
        );
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
      toast.promise(
        updateCurrent({
          games_id: game._id,
        }),
        {
          loading: "Определяем следующего игрока",
          success: "Игрок определен",
          error: (error) => error,
        },
      );
    } else {
      // тестовая тема
      toast.promise(
        updateCurrent({
          games_id: game._id,
        }),
        {
          loading: "Определяем следующего игрока",
          success: "Игрок определен",
          error: (error) => error,
        },
      );
    }
    setFinishActions(true);
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
        <BuyComponent
          onBuy={baseBuy}
          money={buyState}
          currentPlayer={currentPlayer}
          generalBalance={GetGeneralBalance(currentPlayer, cards)}
          onAuction={baseAuction}
        />
      )}
      {payState !== 0 && (
        <PayComponent
          onPay={basePay}
          money={payState}
          currentPlayer={currentPlayer}
          generalBalance={GetGeneralBalance(currentPlayer, cards)}
          onLose={baseLose}
        />
      )}
      {luckyState && <LuckyComponent onChoice={baseLucky} />}
      {natureState !== 0 && <RollDice rolling={baseNature} />}
      {openIndex !== -1 && (
        <GameBoardCardInfo
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
