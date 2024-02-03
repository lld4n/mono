import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const forward = mutation({
  args: {
    games_id: v.id("games"),
    message: v.string(),
    players: v.id("players"),
    money: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const splitMessage = args.message.split("$");
    let result = "";
    for (let i = 0; i < splitMessage.length; i++) {
      if (!splitMessage[i].includes(" ")) {
        const playerId = splitMessage[i] as Id<"players">;
        const player = await ctx.db.get(playerId);
        if (!player) throw new Error("Игрок не найден");
        const user = await ctx.db.get(player.user);
        if (!user) throw new Error("Пользователь не найден");
        result += user.name;
      } else {
        result += splitMessage[i];
      }
    }
    await ctx.db.insert("system", {
      games_id: args.games_id,
      message: result,
      players: args.players,
      money: args.money,
    });
  },
});

export const getByGames = query({
  args: {
    games_id: v.id("games"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("system")
      .withIndex("by_games", (q) => q.eq("games_id", args.games_id))
      .order("desc")
      .collect();
  },
});
