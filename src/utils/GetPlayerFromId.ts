import { PlayersGetType } from "@/types/PlayersGetType";
import { Id } from "../../convex/_generated/dataModel";

export const GetPlayerFromId = (
  players: PlayersGetType[],
  players_id: Id<"players">,
) => {
  for (const player of players) {
    if (player._id === players_id) {
      return player;
    }
  }
};
