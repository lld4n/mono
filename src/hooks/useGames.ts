import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { Id } from "../../convex/_generated/dataModel";

export function useGames() {
  const open = useMutation(api.games.open);
  const start = useMutation(api.games.start);
  const updateTimer = useMutation(api.games.updateTimer);
  const updateCurrent = useMutation(api.games.updateCurrent);

  const toastOpen = (games_id: Id<"games">, isOpen: boolean) => {
    toast.promise(
      open({
        games_id,
      }),
      {
        loading: isOpen ? "Закрываем комнату" : "Открываем комнату",
        success: isOpen ? "Комната закрыта" : "Комната открыта",
        error: (error) => error,
      },
    );
  };
  const toastStart = (games_id: Id<"games">) => {
    toast.promise(
      start({
        games_id,
      }),
      {
        loading: "Начинаем игру",
        success: "Игра началась",
        error: (error) => error,
      },
    );
  };
  const toastUpdateTimer = (games_id: Id<"games">) => {
    toast.promise(
      updateTimer({
        games_id,
      }),
      {
        loading: "Обновляем таймер",
        success: "Таймер обновлен",
        error: (error) => error,
      },
    );
  };
  const toastUpdateCurrent = (games_id: Id<"games">) => {
    toast.promise(
      updateCurrent({
        games_id,
      }),
      {
        loading: "Определяем следующего игрока",
        success: "Следующий игрок определен",
        error: (error) => error,
      },
    );
  };

  return { toastOpen, toastStart, toastUpdateCurrent, toastUpdateTimer };
}
