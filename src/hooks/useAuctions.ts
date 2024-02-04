import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { toast } from "sonner";

export function useAuctions() {
  const create = useMutation(api.auctions.create);
  const update = useMutation(api.auctions.update);
  const toastCreateAuction = (games_id: Id<"games">, cards_id: Id<"cards">) => {
    toast.promise(
      create({
        games_id,
        cards_id,
      }),
      {
        loading: "Создаем аукцион",
        success: "Аукцион создан",
        error: (error) => error,
      },
    );
  };

  const toastUpdate = (auctions_id: Id<"auctions">, players_id: Id<"players">) => {
    toast.promise(
      update({
        auctions_id,
        players_id,
      }),
      {
        loading: "Обновляем аукцион",
        success: "Аукцион обновлён успешно",
      },
    );
  };

  return { toastCreateAuction, toastUpdate };
}
