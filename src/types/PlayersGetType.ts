import { Doc, Id } from "../../convex/_generated/dataModel";

export type PlayersGetType = {
  _id: Id<"players">;
  selected: number;
  position: number;
  balance: number;
  loser: boolean;
  prev?: Id<"players">;
  next?: Id<"players">;
  user: Doc<"users"> | null;
  games_id: Id<"games">;
};
