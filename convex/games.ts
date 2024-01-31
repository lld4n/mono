import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const cardsIndexList = [
  1, 3, 6, 8, 9, 11, 13, 14, 16, 18, 19, 21, 23, 24, 26, 27, 29, 31, 32, 34, 37,
  39, 5, 15, 25, 35, 12, 28,
];
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
  },
});

export const getOpen = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("games")
      .filter((q) =>
        q.and(
          q.eq(q.field("open"), true),
          q.lt(q.field("players_count"), 5),
          q.eq(q.field("started"), 0),
        ),
      )
      .order("desc")
      .take(20);
  },
});

export const start = mutation({
  args: {
    games_id: v.id("games"),
  },
  handler: async (ctx, args) => {
    const players = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("games_id"), args.games_id))
      .collect();
    const game = await ctx.db.get(args.games_id);
    if (players.length === 0) {
      throw new Error("Нет игроков");
    }
    if (game === null) {
      throw new Error("Игра не найдена");
    }
    if (!players.every((p) => p.selected !== -1)) {
      throw new Error("Не все выбрали фигуру");
    }
    await ctx.db.patch(game._id, {
      started: new Date().getTime(),
    });
    for (let i = 1; i < players.length + 1; i++) {
      await ctx.db.patch(players[i - 1]._id, {
        order: i,
      });
    }
    for (const index of cardsIndexList) {
      await ctx.db.insert("cards", {
        games_id: game._id,
        index,
        status: -1,
        buy: true,
        mortgage: false,
      });
    }
  },
});

export const remove = mutation({
  args: {
    games_id: v.id("games"),
  },
  handler: async (ctx, args) => {
    const players = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("games_id"), args.games_id))
      .collect();
    for (let player of players) {
      await ctx.db.delete(player._id);
    }
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("games_id"), args.games_id))
      .collect();
    for (let message of messages) {
      await ctx.db.delete(message._id);
    }
    const cards = await ctx.db
      .query("cards")
      .filter((q) => q.eq(q.field("games_id"), args.games_id))
      .collect();
    for (let card of cards) {
      await ctx.db.delete(card._id);
    }

    const game = await ctx.db.get(args.games_id);
    if (game && !game.winner) {
      await ctx.db.delete(game._id);
    }
  },
});
