import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { PlayersGetType } from "../src/types/PlayersGetType";

export const send = mutation({
  args: {
    players_id: v.id("players"),
    games_id: v.id("games"),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      games_id: args.games_id,
      player: args.players_id,
      message: args.message,
    });
  },
});

export const getByGames = query({
  args: {
    games_id: v.id("games"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("games_id"), args.games_id))
      .order("desc")
      .take(200);
  },
});

export const sendTech = mutation({
  args: {
    games_id: v.id("games"),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      games_id: args.games_id,
      message: args.message,
    });
  },
});
