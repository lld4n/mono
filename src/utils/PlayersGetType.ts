import { Doc, Id } from "../../convex/_generated/dataModel";

export type PlayersGetType = {
  selected: number;
  position: number;
  balance: number;
  loser: boolean;
  order: number;
  user: Doc<"users"> | null;
  games_id: Id<"games">;
};
