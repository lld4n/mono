import React from "react";
import { PlayersGetType } from "@/types/PlayersGetType";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { CardsGetType } from "@/types/CardsGetType";
import { cardsList } from "@/constants/cards";
import CardInfoRender from "@/components/Game/Center/CardInfo/CardInfoRender/CardInfoRender";
import MiniButton from "@/components/Buttons/MiniButton/MiniButton";
import { GetOwnerGroupCards } from "@/utils/GetOwnerGroupCards";
import { useCards } from "@/hooks/useCards";

export default function CardInfo({
  players,
  cards,
  openIndex,
  setOpenIndex,
  currentPlayer,
  game,
}: {
  players: PlayersGetType[];
  cards: CardsGetType[];
  openIndex: number;
  setOpenIndex: React.Dispatch<React.SetStateAction<number>>;
  currentPlayer: Doc<"players">;
  game: Doc<"games">;
}) {
  const { toastUnmortgage, toastMortgage, toastBuild, toastUnbuild } = useCards();

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
            onClick={() =>
              toastUnmortgage(currentPlayer._id, bdCard._id, currentCard.unlock)
            }
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
              onClick={() =>
                toastMortgage(currentPlayer._id, bdCard._id, currentCard.buy / 2)
              }
            >
              Заложить
            </MiniButton>
            <MiniButton
              onClick={() =>
                toastBuild(currentPlayer._id, bdCard._id, currentCard.build)
              }
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
              onClick={() =>
                toastUnbuild(currentPlayer._id, bdCard._id, currentCard.build)
              }
            >
              Продать дом
            </MiniButton>
            <MiniButton
              onClick={() =>
                toastBuild(currentPlayer._id, bdCard._id, currentCard.build)
              }
            >
              Купить дом
            </MiniButton>
          </>
        );
      }

      if (
        currentPlayer.balance < currentCard.build &&
        bdCard.status > 0 &&
        bdCard.status <= 4 &&
        GetOwnerGroupCards(cards, currentCard)
      ) {
        return (
          <MiniButton
            danger
            onClick={() =>
              toastUnbuild(currentPlayer._id, bdCard._id, currentCard.build)
            }
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
              onClick={() =>
                toastUnbuild(currentPlayer._id, bdCard._id, currentCard.build)
              }
            >
              Продать дом
            </MiniButton>
            <MiniButton
              onClick={() =>
                toastBuild(currentPlayer._id, bdCard._id, currentCard.build)
              }
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
            onClick={() =>
              toastUnbuild(currentPlayer._id, bdCard._id, currentCard.build)
            }
          >
            Продать отель
          </MiniButton>
        );
      }

      return (
        <MiniButton
          danger
          onClick={() =>
            toastMortgage(currentPlayer._id, bdCard._id, currentCard.buy / 2)
          }
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
            onClick={() =>
              toastUnmortgage(currentPlayer._id, bdCard._id, currentCard.unlock)
            }
          >
            Выкупить
          </MiniButton>
        );
      }
      return (
        <MiniButton
          danger
          onClick={() =>
            toastMortgage(currentPlayer._id, bdCard._id, currentCard.buy / 2)
          }
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
