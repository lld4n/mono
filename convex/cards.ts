import { query } from "./_generated/server";
import { v } from "convex/values";
import { CardsGetType } from "../src/types/CardsGetType";

export const getByGames = query({
  args: {
    games_id: v.id("games"),
  },
  handler: async (ctx, args) => {
    const convexCards = await ctx.db
      .query("cards")
      .filter((q) => q.eq(q.field("games_id"), args.games_id))
      .collect();
    const res: CardsGetType[] = new Array(40).fill(null);
    for (const card of convexCards) {
      res[card.index] = card;
    }
    return res;
  },
});
