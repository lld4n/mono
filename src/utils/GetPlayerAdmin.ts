import { PlayersGetType } from "@/utils/PlayersGetType";
import { Doc } from "../../convex/_generated/dataModel";

export const getPlayerAdmin = (
  players: PlayersGetType[],
  game: Doc<"games">,
) => {
  const admin_id = game.admin;
  for (const player of players) {
    if (player.user!._id === admin_id) {
      return player;
    }
  }
};
