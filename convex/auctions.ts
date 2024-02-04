import { action, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { api } from "./_generated/api";

export const getByGames = query({
  args: {
    games_id: v.id("games"),
  },
  handler: async (ctx, args) => {
    const auctions = await ctx.db
      .query("auctions")
      .withIndex("by_games", (q) => q.eq("games_id", args.games_id))
      .collect();
    if (auctions.length > 1) throw new Error("Критическая ошибка с обменами");
    if (!auctions) return null;
    return auctions[0];
  },
});

export const update = mutation({
  args: {
    auctions_id: v.id("auctions"),
    players_id: v.id("players"),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.players_id);
    const auction = await ctx.db.get(args.auctions_id);
    if (!player) throw new ConvexError("Игрок не найден");
    if (!auction) throw new ConvexError("Аукцион не найден");
    if (player.balance < auction.money + 100)
      throw new ConvexError("Баланс игрока меньше, чем стоимость аукциона");

    await ctx.db.patch(auction._id, {
      players_id: player._id,
      money: auction.money + 100,
      timer: auction.timer + 10000,
    });

    const sch = await ctx.db.system.query("_scheduled_functions").collect();
    for (const s of sch) await ctx.scheduler.cancel(s._id);

    await ctx.scheduler.runAfter(10000, api.auctions.internalFinal, {
      auctions_id: auction._id,
    });
  },
});

export const internalFinal = action({
  args: {
    auctions_id: v.id("auctions"),
  },
  handler: async (ctx, args) => {
    const auction = await ctx.runQuery(api.auctions.getAuction, {
      auctions_id: args.auctions_id,
    });
    if (!auction) throw new ConvexError("Аукцион не найден");
    if (auction.players_id) {
      await ctx.runMutation(api.cards.buy, {
        players_id: auction.players_id,
        cards_id: auction.cards_id,
        money: auction.money,
      });
    }
    await ctx.runMutation(api.games.updateCurrent, {
      games_id: auction.games_id,
    });
    await ctx.runMutation(api.auctions.deleteAuction, {
      auctions_id: auction._id,
    });
  },
});

export const getAuction = query({
  args: {
    auctions_id: v.id("auctions"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.auctions_id);
  },
});

export const deleteAuction = mutation({
  args: {
    auctions_id: v.id("auctions"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.auctions_id);
  },
});

export const create = mutation({
  args: {
    games_id: v.id("games"),
    cards_id: v.id("cards"),
  },
  handler: async (ctx, args) => {
    const auctions = await ctx.db
      .query("auctions")
      .withIndex("by_games", (q) => q.eq("games_id", args.games_id))
      .collect();

    if (auctions.length > 0) throw new Error("Критическая ошибка с обменами");

    await ctx.db.patch(args.games_id, {
      timer: 0,
    });

    const auctionId = await ctx.db.insert("auctions", {
      timer: Date.now() + 10000,
      money: 0,
      games_id: args.games_id,
      cards_id: args.cards_id,
    });

    const sch = await ctx.db.system.query("_scheduled_functions").collect();
    for (const s of sch) await ctx.scheduler.cancel(s._id);

    await ctx.scheduler.runAfter(10000, api.auctions.internalFinal, {
      auctions_id: auctionId,
    });
  },
});
