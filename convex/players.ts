import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { PlayersGetType } from "../src/types/PlayersGetType";
import { internal } from "./_generated/api";
import { Simulate } from "react-dom/test-utils";
import play = Simulate.play;

export const add = mutation({
  args: {
    games_id: v.id("games"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Пользователь не найден");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("token", identity.tokenIdentifier))
      .unique();

    if (user === null) throw new Error("Не удалось получить данные о пользователе");

    const player = await ctx.db
      .query("players")
      .withIndex("by_games", (q) => q.eq("games_id", args.games_id))
      .filter((q) => q.eq(q.field("user"), user._id))
      .first();

    if (!player) {
      const game = await ctx.db.get(args.games_id);
      if (!game) throw new Error("Игра не найдена");

      const player_id = await ctx.db.insert("players", {
        selected: -1,
        position: 0,
        balance: 1500,
        loser: false,
        user: user._id,
        games_id: args.games_id,
      });
      await ctx.db.patch(args.games_id, {
        players_count: game.players_count + 1,
      });
      return player_id;
    }

    return player._id;
  },
});

export const remove = mutation({
  args: { players_id: v.id("players") },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.players_id);
    if (player === null) throw new Error("Игрок не найден");

    const game = await ctx.db.get(player.games_id);
    if (game === null) throw new Error("Игра не найдена");

    await ctx.db.patch(game._id, {
      players_count: game.players_count - 1,
    });

    await ctx.db.delete(args.players_id);
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_games", (q) => q.eq("games_id", game._id))
      .collect();

    for (const message of messages) {
      if (message.player) {
        const messagePlayer = await ctx.db.get(message.player);
        if (messagePlayer === null) {
          await ctx.db.delete(message._id);
        }
      }
    }
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
      .withIndex("by_games", (q) => q.eq("games_id", args.games_id))
      .collect();

    if (players.map((e) => e.selected).includes(args.selected))
      throw new Error("Персонаж уже выбран другим игроком");

    await ctx.db.patch(args.players_id, {
      selected: args.selected,
    });
  },
});

export const getAllByGames = query({
  args: {
    games_id: v.id("games"),
  },
  handler: async (ctx, args) => {
    let players = await ctx.db
      .query("players")
      .withIndex("by_games", (q) => q.eq("games_id", args.games_id))
      .collect();
    const result: PlayersGetType[] = await Promise.all(
      players.map(async (players) => {
        return {
          ...players,
          user: await ctx.db.get(players.user),
        };
      }),
    );
    return result;
  },
});

export const getByGames = query({
  args: {
    games_id: v.id("games"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Пользователь не найден");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("token", identity.tokenIdentifier))
      .unique();
    if (user === null) throw new Error("Не удалось получить данные о пользователе");

    return await ctx.db
      .query("players")
      .withIndex("by_games", (q) => q.eq("games_id", args.games_id))
      .filter((q) => q.eq(q.field("user"), user._id))
      .first();
  },
});

export const internalLose = internalMutation({
  args: { players_id: v.id("players") },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.players_id);
    if (!player) throw new Error("Игрок не найден");

    const game = await ctx.db.get(player.games_id);
    if (!game) throw new Error("Игра не найдена");

    await ctx.db.patch(player._id, {
      loser: true,
    });

    const players = await ctx.db
      .query("players")
      .withIndex("by_games", (q) => q.eq("games_id", game._id))
      .filter((q) => q.eq(q.field("loser"), false))
      .collect();

    if (players.length === 1) {
      const winner = await ctx.db.get(players[0]._id);
      if (!winner) throw new Error("Победитель не найден");

      await ctx.db.patch(game._id, {
        winner: winner.user,
      });

      const user = await ctx.db.get(winner.user);
      if (!user) throw new Error("Пользователь не найден");

      await ctx.db.patch(winner.user, {
        wins: user.wins + 1,
      });
      return;
    }

    const cards = await ctx.db
      .query("cards")
      .withIndex("by_games", (q) => q.eq("games_id", game._id))
      .filter((q) => q.eq(q.field("owner"), player._id))
      .collect();
    for (let card of cards) {
      await ctx.db.patch(card._id, {
        status: -1,
        buy: true,
        mortgage: false,
        owner: undefined,
      });
    }

    if (game.current === player._id) {
      const sch = await ctx.db.system.query("_scheduled_functions").collect();
      for (const s of sch) {
        await ctx.scheduler.cancel(s._id);
      }
      await ctx.db.patch(game._id, {
        timer: Date.now() + 120 * 1000,
        current: player.next,
      });
      await ctx.scheduler.runAfter(120000, internal.players.internalLose, {
        players_id: game.current,
      });
    }
    const nextPlayerId = player.next;
    const prevPlayerId = player.prev;
    if (!nextPlayerId) throw new Error("Следующий игрок не найден");
    if (!prevPlayerId) throw new Error("Предыдущий игрок не найден");

    await ctx.db.patch(nextPlayerId, {
      prev: prevPlayerId,
    });
    await ctx.db.patch(prevPlayerId, {
      next: nextPlayerId,
    });

    await ctx.db.patch(player._id, {
      balance: 0,
    });

    const loser = await ctx.db.get(player.user);

    if (!loser) throw new Error("Проигравший не найден");

    await ctx.db.patch(loser._id, {
      losers: loser.losers - 1,
    });
  },
});

export const lose = mutation({
  args: { players_id: v.id("players") },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.players_id);
    if (!player) throw new Error("Игрок не найден");

    const game = await ctx.db.get(player.games_id);
    if (!game) throw new Error("Игра не найдена");

    await ctx.db.patch(player._id, {
      loser: true,
    });

    const players = await ctx.db
      .query("players")
      .withIndex("by_games", (q) => q.eq("games_id", game._id))
      .filter((q) => q.eq(q.field("loser"), false))
      .collect();

    if (players.length === 1) {
      const winner = await ctx.db.get(players[0]._id);
      if (!winner) throw new Error("Победитель не найден");

      await ctx.db.patch(game._id, {
        winner: winner.user,
      });

      const user = await ctx.db.get(winner.user);

      if (!user) throw new Error("Пользователь не найден");

      await ctx.db.patch(winner.user, {
        wins: user.wins + 1,
      });
      return;
    }

    const cards = await ctx.db
      .query("cards")
      .withIndex("by_games", (q) => q.eq("games_id", game._id))
      .filter((q) => q.eq(q.field("owner"), player._id))
      .collect();
    for (let card of cards) {
      await ctx.db.patch(card._id, {
        status: -1,
        buy: true,
        mortgage: false,
        owner: undefined,
      });
    }

    if (game.current === player._id) {
      const sch = await ctx.db.system.query("_scheduled_functions").collect();
      for (const s of sch) {
        await ctx.scheduler.cancel(s._id);
      }
      await ctx.db.patch(game._id, {
        timer: Date.now() + 120 * 1000,
        current: player.next,
      });
      await ctx.scheduler.runAfter(120000, internal.players.internalLose, {
        players_id: game.current,
      });
    }
    const nextPlayerId = player.next;
    const prevPlayerId = player.prev;
    if (!nextPlayerId) throw new Error("Следующий игрок не найден");
    if (!prevPlayerId) throw new Error("Предыдущий игрок не найден");

    await ctx.db.patch(nextPlayerId, {
      prev: prevPlayerId,
    });
    await ctx.db.patch(prevPlayerId, {
      next: nextPlayerId,
    });

    await ctx.db.patch(player._id, {
      balance: 0,
    });

    const loser = await ctx.db.get(player.user);

    if (!loser) throw new Error("Проигравший не найден");

    await ctx.db.patch(loser._id, {
      losers: loser.losers - 1,
    });
  },
});

export const updateBalance = mutation({
  args: {
    players_id: v.id("players"),
    money: v.number(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.players_id);
    if (player === null) throw new Error("Игрок не найден");

    await ctx.db.patch(args.players_id, {
      balance: player.balance + args.money,
    });
  },
});

export const updatePosition = mutation({
  args: {
    players_id: v.id("players"),
    position: v.number(),
  },
  handler: async (ctx, args) => {
    if (args.position > 39) throw new Error("Неправильная позиция");

    await ctx.db.patch(args.players_id, {
      position: args.position,
    });
  },
});
