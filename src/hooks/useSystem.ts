import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export function useSystem() {
  const forward = useMutation(api.system.forward);

  const system = (
    players: Id<"players">,
    games_id: Id<"games">,
    message: string,
    money?: number,
  ) => {
    forward({
      players,
      games_id,
      message,
      money,
    });
  };

  return { system };
}
