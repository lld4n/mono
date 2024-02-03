import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { Id } from "../../convex/_generated/dataModel";

export function useCards() {
  const mortgage = useMutation(api.cards.mortgage);
  const unmortgage = useMutation(api.cards.unmortgage);
  const build = useMutation(api.cards.build);
  const unbuild = useMutation(api.cards.unbuild);

  const buy = useMutation(api.cards.buy);

  const toastBuy = (
    cards_id: Id<"cards">,
    players_id: Id<"players">,
    money: number,
  ) => {
    toast.promise(
      buy({
        cards_id,
        players_id,
        money,
      }),
      {
        loading: "Покупаем карточку",
        success: "Карточка куплена",
        error: (error) => error,
      },
    );
  };

  const toastUnbuild = (
    players_id: Id<"players">,
    cards_id: Id<"cards">,
    money: number,
  ) => {
    toast.promise(
      unbuild({
        players_id,
        cards_id,
        money,
      }),
      {
        loading: "Продаем здание",
        success: "Здание продано",
        error: (error) => error,
      },
    );
  };
  const toastBuild = (
    players_id: Id<"players">,
    cards_id: Id<"cards">,
    money: number,
  ) => {
    toast.promise(
      build({
        players_id,
        cards_id,
        money,
      }),
      {
        loading: "Покупаем здание",
        success: "Здание куплено",
        error: (error) => error,
      },
    );
  };

  const toastMortgage = (
    players_id: Id<"players">,
    cards_id: Id<"cards">,
    money: number,
  ) => {
    toast.promise(
      mortgage({
        players_id,
        cards_id,
        money,
      }),
      {
        loading: "Закладываем карточку",
        success: "Карточка заложена",
        error: (error) => error,
      },
    );
  };

  const toastUnmortgage = (
    players_id: Id<"players">,
    cards_id: Id<"cards">,
    money: number,
  ) => {
    toast.promise(
      unmortgage({
        players_id,
        cards_id,
        money,
      }),
      {
        loading: "Выкупаем карточку",
        success: "Карточка выкуплена",
        error: (error) => error,
      },
    );
  };

  return { toastUnmortgage, toastMortgage, toastBuild, toastUnbuild, toastBuy };
}
