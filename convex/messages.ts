import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const send = mutation({
  args: {
    players_id: v.id("players"),
    games_id: v.id("games"),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
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
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("games_id"), args.games_id))
      .order("desc")
      .take(200);

    const messagesByPlayers = await Promise.all(
      messages
        .filter((message) => message.player)
        .map(async (message) => {
          return {
            ...message,
            player: await ctx.db.get(message.player!),
          };
        }),
    );

    const messagesByPlayersUser = await Promise.all(
      messagesByPlayers.map(async (message) => {
        return {
          ...message,
          player: {
            ...message.player,
            user: await ctx.db.get(message.player!.user),
          },
        };
      }),
    );
    const techMessages = messages.filter((message) => !message.player);
    return [...techMessages, ...messagesByPlayersUser].sort(
      (a, b) => a._creationTime - b._creationTime,
    );
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
