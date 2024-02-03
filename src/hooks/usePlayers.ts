import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { Id } from "../../convex/_generated/dataModel";

export function usePlayers() {
  const updateBalance = useMutation(api.players.updateBalance);
  const updatePosition = useMutation(api.players.updatePosition);
  const lose = useMutation(api.players.lose);
  const select = useMutation(api.players.select);
  const add = useMutation(api.players.add);
  const remove = useMutation(api.players.remove);

  const toastUpdateBalance = (players_id: Id<"players">, money: number) => {
    toast.promise(
      updateBalance({
        players_id,
        money,
      }),
      {
        loading: "Обновляем баланс",
        success: "Баланс обновлен",
        error: (error) => error,
      },
    );
  };
  const toastUpdatePosition = (players_id: Id<"players">, position: number) => {
    toast.promise(
      updatePosition({
        players_id,
        position,
      }),
      {
        loading: "Обновляем позицию игрока",
        success: "Позиция игрока обновлена",
        error: (error) => error,
      },
    );
  };
  const toastLose = (players_id: Id<"players">) => {
    toast.promise(
      lose({
        players_id,
      }),
      {
        loading: "Обнуляем игрока",
        success: "Игрок обнулен",
        error: (error) => error,
      },
    );
  };
  const toastSelect = (
    players_id: Id<"players">,
    games_id: Id<"games">,
    selected: number,
  ) => {
    toast.promise(
      select({
        players_id,
        games_id,
        selected,
      }),
      {
        loading: "Выбираем фигуру",
        success: "Фигура выбрана",
        error: (error) => error,
      },
    );
  };
  const toastAdd = (games_id: Id<"games">) => {
    toast.promise(
      add({
        games_id,
      }),
      {
        loading: "Добавляем игрока",
        success: "Игрок добавлен",
        error: (error) => error,
      },
    );
  };
  const toastRemove = (players_id: Id<"players">) => {
    toast.promise(
      remove({
        players_id,
      }),
      {
        loading: "Удаляем игрока",
        success: "Игрок удален",
        error: (error) => error,
      },
    );
  };

  return {
    toastUpdateBalance,
    toastUpdatePosition,
    toastLose,
    toastSelect,
    toastAdd,
    toastRemove,
  };
}
