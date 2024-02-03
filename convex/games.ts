import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api";

const cardsIndexList = [
  1, 3, 6, 8, 9, 11, 13, 14, 16, 18, 19, 21, 23, 24, 26, 27, 29, 31, 32, 34, 37, 39, 5,
  15, 25, 35, 12, 28,
];
export const create = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Пользователь не найден");
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("token", identity.tokenIdentifier))
      .unique();
    if (user === null) throw new Error("Не удалось получить данные о пользователе");
    return await ctx.db.insert("games", {
      started: 0,
      admin: user._id,
      open: false,
      players_count: 0,
      timer: 0,
    });
  },
});

export const get = query({
  args: { games_id: v.id("games") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.games_id);
  },
});

export const open = mutation({
  args: { games_id: v.id("games") },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.games_id);
    if (game === null) throw new Error("Игра не найдена");
    await ctx.db.patch(args.games_id, {
      open: !game.open,
    });
  },
});

export const getOpen = query({
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
      .withIndex("by_games", (q) => q.eq("games_id", args.games_id))
      .collect();
    const game = await ctx.db.get(args.games_id);

    if (players.length === 0) throw new Error("Игроки не найдены");
    if (game === null) throw new Error("Игра не найдена");
    if (game.players_count === 1 || game.players_count > 5)
      throw new Error("Игроков слишком мало или слишком много");
    if (!players.every((p) => p.selected !== -1))
      throw new Error("Не все игроки выбрали фигуру");

    await ctx.db.patch(game._id, {
      started: new Date().getTime(),
    });

    // cyclic linked list
    for (let i = 0; i < players.length - 1; i++) {
      await ctx.db.patch(players[i]._id, {
        next: players[i + 1]._id,
      });
    }
    for (let i = players.length - 1; i >= 1; i--) {
      await ctx.db.patch(players[i]._id, {
        prev: players[i - 1]._id,
      });
    }
    await ctx.db.patch(players[players.length - 1]._id, {
      next: players[0]._id,
    });
    await ctx.db.patch(players[0]._id, {
      prev: players[players.length - 1]._id,
    });

    await ctx.db.patch(game._id, {
      current: players[0]._id,
    });
    for (const index of cardsIndexList) {
      await ctx.db.insert("cards", {
        games_id: game._id,
        index,
        status: -1,
        buy: true,
        mortgage: false,
      });
    }
    await ctx.db.patch(game._id, {
      timer: Date.now() + 120000,
    });
    await ctx.scheduler.runAfter(120000, internal.players.internalLose, {
      players_id: players[0]._id,
    });
  },
});

export const updateTimer = mutation({
  args: { games_id: v.id("games") },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.games_id);
    if (!game) throw new Error("Игра не найдена");
    if (!game.current) throw new Error("Текущий игрок не найден");

    const sch = await ctx.db.system.query("_scheduled_functions").collect();
    for (const s of sch) await ctx.scheduler.cancel(s._id);

    await ctx.db.patch(args.games_id, {
      timer: Date.now() + 90 * 1000,
    });
    await ctx.scheduler.runAfter(90000, internal.players.internalLose, {
      players_id: game.current,
    });
  },
});

export const updateCurrent = mutation({
  args: { games_id: v.id("games") },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.games_id);

    if (!game) throw new Error("Игра не найдена");
    if (!game.current) throw new Error("Текущий игрок не найден");

    const currentPlayer = await ctx.db.get(game.current);

    if (!currentPlayer) throw new Error("Такого игрока не существует");
    if (!currentPlayer.next) throw new Error("Следующего игрока не существует");

    const sch = await ctx.db.system.query("_scheduled_functions").collect();
    for (const s of sch) await ctx.scheduler.cancel(s._id);

    await ctx.db.patch(game._id, {
      current: currentPlayer.next,
      timer: Date.now() + 90 * 1000,
    });
    await ctx.scheduler.runAfter(90000, internal.players.internalLose, {
      players_id: game.current,
    });
  },
});

export const remove = action({
  args: {
    games_id: v.id("games"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.runMutation(api.games.removePlayers, {
      games_id: args.games_id,
    });
    if (result === "success") {
      await ctx.runMutation(api.games.removeMessages, {
        games_id: args.games_id,
      });
      await ctx.runMutation(api.games.removeCards, {
        games_id: args.games_id,
      });
      await ctx.runMutation(api.games.del, {
        games_id: args.games_id,
      });
    }
  },
});

export const removePlayers = mutation({
  args: { games_id: v.id("games") },
  handler: async (ctx, args) => {
    const players = await ctx.db
      .query("players")
      .withIndex("by_games", (q) => q.eq("games_id", args.games_id))
      .collect();
    for (let player of players) await ctx.db.delete(player._id);

    const sch = await ctx.db.system.query("_scheduled_functions").collect();
    for (const s of sch) await ctx.scheduler.cancel(s._id);

    return "success";
  },
});

export const removeMessages = mutation({
  args: { games_id: v.id("games") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_games", (q) => q.eq("games_id", args.games_id))
      .collect();
    for (let message of messages) {
      await ctx.db.delete(message._id);
    }
  },
});

export const removeCards = mutation({
  args: { games_id: v.id("games") },
  handler: async (ctx, args) => {
    const cards = await ctx.db
      .query("cards")
      .withIndex("by_games", (q) => q.eq("games_id", args.games_id))
      .collect();
    for (let card of cards) {
      await ctx.db.delete(card._id);
    }
  },
});

export const del = mutation({
  args: { games_id: v.id("games") },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.games_id);
    if (game && !game.winner) {
      await ctx.db.delete(game._id);
    }
  },
});
