import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { PlayersGetType } from "../src/utils/PlayersGetType";

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
      .filter((q) =>
        q.and(
          q.eq(q.field("user"), user_id),
          q.eq(q.field("games_id"), args.games_id),
        ),
      )
      .first();
    if (!player) {
      const game = await ctx.db.get(args.games_id);
      if (!game) {
        throw new Error("Игра не найдена");
      }
      const player_id = await ctx.db.insert("players", {
        selected: -1,
        position: 0,
        balance: 1500,
        loser: false,
        order: -1,
        user: user_id,
        games_id: args.games_id,
      });
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
    const player = await ctx.db.get(args.players_id);
    if (player) {
      const game = await ctx.db.get(player.games_id);
      if (game) {
        await ctx.db.patch(game?._id, {
          players_count: game.players_count--,
        });
      } else {
        throw new Error("Игра не найдена");
      }
      await ctx.db.delete(args.players_id);
    } else {
      throw new Error("Пользователь не найден");
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
    let players = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("games_id"), args.games_id))
      .collect();
    const result: PlayersGetType[] = await Promise.all(
      players.map(async (players) => {
        return {
          ...players,
          user: await ctx.db.get(players.user),
        };
      }),
    );
    result.sort((a, b) => a.order - b.order);
    return result;
  },
});
