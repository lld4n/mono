import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { toast } from "sonner";

export function useSwaps() {
  const create = useMutation(api.swaps.create);
  const concur = useMutation(api.swaps.concur);
  const refuse = useMutation(api.swaps.refuse);
  const toastCreateSwaps = (
    games_id: Id<"games">,
    sender: Id<"players">,
    recipient: Id<"players">,
    sender_money: number,
    recipient_money: number,
    sender_cards: Id<"cards">[],
    recipient_cards: Id<"cards">[],
  ) => {
    toast.promise(
      create({
        games_id,
        sender,
        recipient,
        sender_money,
        recipient_money,
        sender_cards,
        recipient_cards,
      }),
      {
        loading: "Создаем обмен",
        success: "Обмен создан",
        error: (error) => error,
      },
    );
  };

  const toastConcur = (swaps_id: Id<"swaps">) => {
    toast.promise(
      concur({
        swaps_id,
      }),
      {
        loading: "Совершаем обмен",
        success: "Обмен прошёл успешно",
      },
    );
  };

  const toastRefuse = (swaps_id: Id<"swaps">) => {
    toast.promise(
      refuse({
        swaps_id,
      }),
      {
        loading: "Отказываемся от обмена",
        success: "Вы отказались от обмена",
      },
    );
  };

  return { toastCreateSwaps, toastConcur, toastRefuse };
}
