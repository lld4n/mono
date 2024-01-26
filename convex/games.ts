import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Ошибка авторизации");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("token", identity.tokenIdentifier))
      .unique();
    if (user === null) {
      throw new Error("Не удалось получить данные о пользователе");
    }
    const user_id = user._id;
    return await ctx.db.insert("games", {
      started: 0,
      admin: user_id,
      open: false,
      current: 1,
      players_count: 0,
    });
  },
});

export const get = query({
  args: { games_id: v.id("games") },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.games_id);
    if (game === null) {
      throw new Error("Игра не найдена");
    }
    return game;
  },
});

export const open = mutation({
  args: { games_id: v.id("games") },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.games_id);
    if (game === null) {
      throw new Error("Игра не найдена");
    }
    await ctx.db.patch(args.games_id, {
      open: !game.open,
    });
    return await ctx.db.get(args.games_id);
  },
});

export const getOpen = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("games")
      .filter((q) =>
        q.and(q.eq(q.field("open"), true), q.lt(q.field("players_count"), 5)),
      )
      .take(20);
  },
});
