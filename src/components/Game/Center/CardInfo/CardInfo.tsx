"use client";
import { PlayersGetType } from "@/types/PlayersGetType";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { CardsGetType } from "@/types/CardsGetType";
import React from "react";
import { cardsList } from "@/constants/cards";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import CardInfoRender from "@/components/Game/Center/CardInfo/CardInfoRender/CardInfoRender";
import MiniButton from "@/components/Buttons/MiniButton/MiniButton";
import { toast } from "sonner";
import { GetOwnerGroupCards } from "@/utils/GetOwnerGroupCards";

type PropsType = {
  players: PlayersGetType[];
  cards: CardsGetType[];
  openIndex: number;
  setOpenIndex: React.Dispatch<React.SetStateAction<number>>;
  currentPlayer: Doc<"players">;
  game: Doc<"games">;
};

export default function CardInfo({
  players,
  cards,
  openIndex,
  setOpenIndex,
  currentPlayer,
  game,
}: PropsType) {
  const mortgage = useMutation(api.cards.mortgage);
  const unmortgage = useMutation(api.cards.unmortgage);
  const build = useMutation(api.cards.build);
  const unbuild = useMutation(api.cards.unbuild);

  const currentCard = cardsList[openIndex];
  const bdCard = cards[openIndex];

  const renderBtnStreet = () => {
    if (
      bdCard === null ||
      bdCard.owner !== currentPlayer._id ||
      game.current !== currentPlayer._id
    ) {
      return "";
    }
    if (currentCard.class === "street" && bdCard) {
      if (bdCard.mortgage) {
        return (
          <MiniButton
            onClick={() => {
              toast.promise(
                unmortgage({
                  players_id: currentPlayer._id,
                  cards_id: bdCard._id,
                  money: currentCard.unlock,
                }),
                {
                  loading: "Выкупаем карточку",
                  success: "Карточка выкуплена",
                  error: (error) => error,
                },
              );
            }}
          >
            Выкупить
          </MiniButton>
        );
      }
      if (
        currentPlayer.balance >= currentCard.build &&
        bdCard.status === 0 &&
        GetOwnerGroupCards(cards, currentCard)
      ) {
        return (
          <>
            <MiniButton
              danger
              onClick={() => {
                toast.promise(
                  mortgage({
                    players_id: currentPlayer._id,
                    cards_id: bdCard._id,
                    money: currentCard.buy / 2,
                  }),
                  {
                    loading: "Закладываем карточку",
                    success: "Карточка заложена",
                    error: (error) => error,
                  },
                );
              }}
            >
              Заложить
            </MiniButton>
            <MiniButton
              onClick={() => {
                toast.promise(
                  build({
                    players_id: currentPlayer._id,
                    cards_id: bdCard._id,
                    money: currentCard.build,
                  }),
                  {
                    loading: "Покупаем дом",
                    success: "Дом куплен",
                    error: (error) => error,
                  },
                );
              }}
            >
              Купить дом
            </MiniButton>
          </>
        );
      }

      if (
        currentPlayer.balance >= currentCard.build &&
        bdCard.status > 0 &&
        bdCard.status < 4 &&
        GetOwnerGroupCards(cards, currentCard)
      ) {
        return (
          <>
            <MiniButton
              danger
              onClick={() => {
                toast.promise(
                  unbuild({
                    players_id: currentPlayer._id,
                    cards_id: bdCard._id,
                    money: currentCard.build,
                  }),
                  {
                    loading: "Продаем дом",
                    success: "Дом продан",
                    error: (error) => error,
                  },
                );
              }}
            >
              Продать дом
            </MiniButton>
            <MiniButton
              onClick={() => {
                toast.promise(
                  build({
                    players_id: currentPlayer._id,
                    cards_id: bdCard._id,
                    money: currentCard.build,
                  }),
                  {
                    loading: "Покупаем дом",
                    success: "Дом куплен",
                    error: (error) => error,
                  },
                );
              }}
            >
              Купить дом
            </MiniButton>
          </>
        );
      }

      if (
        currentPlayer.balance < currentCard.build &&
        bdCard.status > 0 &&
        bdCard.status < 4 &&
        GetOwnerGroupCards(cards, currentCard)
      ) {
        return (
          <MiniButton
            danger
            onClick={() => {
              toast.promise(
                unbuild({
                  players_id: currentPlayer._id,
                  cards_id: bdCard._id,
                  money: currentCard.build,
                }),
                {
                  loading: "Продаем дом",
                  success: "Дом продан",
                  error: (error) => error,
                },
              );
            }}
          >
            Продать дом
          </MiniButton>
        );
      }

      if (
        currentPlayer.balance >= currentCard.build &&
        bdCard.status === 4 &&
        GetOwnerGroupCards(cards, currentCard)
      ) {
        return (
          <>
            <MiniButton
              danger
              onClick={() => {
                toast.promise(
                  unbuild({
                    players_id: currentPlayer._id,
                    cards_id: bdCard._id,
                    money: currentCard.build,
                  }),
                  {
                    loading: "Продаем дом",
                    success: "Дом продан",
                    error: (error) => error,
                  },
                );
              }}
            >
              Продать дом
            </MiniButton>
            <MiniButton
              onClick={() => {
                toast.promise(
                  build({
                    players_id: currentPlayer._id,
                    cards_id: bdCard._id,
                    money: currentCard.build,
                  }),
                  {
                    loading: "Покупаем отель",
                    success: "Отель куплен",
                    error: (error) => error,
                  },
                );
              }}
            >
              Купить отель
            </MiniButton>
          </>
        );
      }

      if (bdCard.status === 5 && GetOwnerGroupCards(cards, currentCard)) {
        return (
          <MiniButton
            danger
            onClick={() => {
              toast.promise(
                unbuild({
                  players_id: currentPlayer._id,
                  cards_id: bdCard._id,
                  money: currentCard.build,
                }),
                {
                  loading: "Продаем отель",
                  success: "Отель продан",
                  error: (error) => error,
                },
              );
            }}
          >
            Продать отель
          </MiniButton>
        );
      }

      return (
        <MiniButton
          danger
          onClick={() => {
            toast.promise(
              mortgage({
                players_id: currentPlayer._id,
                cards_id: bdCard._id,
                money: currentCard.buy / 2,
              }),
              {
                loading: "Закладываем карточку",
                success: "Карточка заложена",
                error: (error) => error,
              },
            );
          }}
        >
          Заложить
        </MiniButton>
      );
    }
    return "че";
  };

  const renderBtnTrainNature = () => {
    if (
      bdCard === null ||
      bdCard.owner !== currentPlayer._id ||
      game.current !== currentPlayer._id
    ) {
      return "";
    }
    if ((currentCard.class === "train" || currentCard.class === "nature") && bdCard) {
      if (bdCard.mortgage) {
        return (
          <MiniButton
            onClick={() => {
              toast.promise(
                unmortgage({
                  players_id: currentPlayer._id,
                  cards_id: bdCard._id,
                  money: currentCard.unlock,
                }),
                {
                  loading: "Выкупаем карточку",
                  success: "Карточка выкуплена",
                  error: (error) => error,
                },
              );
            }}
          >
            Выкупить
          </MiniButton>
        );
      }
      return (
        <MiniButton
          danger
          onClick={() => {
            toast.promise(
              mortgage({
                players_id: currentPlayer._id,
                cards_id: bdCard._id,
                money: currentCard.buy / 2,
              }),
              {
                loading: "Закладываем карточку",
                success: "Карточка заложена",
                error: (error) => error,
              },
            );
          }}
        >
          Заложить
        </MiniButton>
      );
    } else {
      return "";
    }
  };

  return (
    <CardInfoRender
      bdCard={bdCard}
      currentCard={currentCard}
      setOpenIndex={setOpenIndex}
      players={players}
      renderBtnStreet={renderBtnStreet}
      renderBtnTrainNature={renderBtnTrainNature}
    />
  );
}
