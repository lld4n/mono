import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
  args: {
    games_id: v.id("games"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Ошибочка");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("token", identity.tokenIdentifier))
      .unique();
    if (user === null) {
      throw new Error("Не удалось получить данные о пользователе");
    }
    const user_id = user._id;

    const player = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("users_id"), user_id))
      .first();
    if (!player) {
      const player_id = await ctx.db.insert("players", {
        selected: -1,
        position: 0,
        balance: 1500,
        loser: false,
        order: -1,
        users_id: user_id,
        games_id: args.games_id,
      });
      const game = await ctx.db.get(args.games_id);
      if (!game) {
        throw new Error("Игра не найдена");
      }
      await ctx.db.patch(args.games_id, {
        players_count: game.players_count++,
      });
      return player_id;
    }

    return player._id;
  },
});

export const remove = mutation({
  args: { players_id: v.id("players") },
  handler: async (ctx, args) => {
    //по идее здесь нужно ещё уменьшать players_count на 1?
    await ctx.db.delete(args.players_id);
  },
});

export const select = mutation({
  args: {
    players_id: v.id("players"),
    games_id: v.id("games"),
    selected: v.number(),
  },
  handler: async (ctx, args) => {
    const players = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("games_id"), args.games_id))
      .collect();
    const filterPlayers = players.filter(
      (player) => player.selected === args.selected,
    );
    if (filterPlayers.length === 0) {
      await ctx.db.patch(args.players_id, {
        selected: args.selected,
      });
    } else {
      throw new Error("Персонаж уже выбран другим игроком");
    }
  },
});

export const getAllByGames = query({
  args: {
    games_id: v.id("games"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("games_id"), args.games_id))
      .collect();
  },
});
