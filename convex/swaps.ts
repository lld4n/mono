import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const getByGames = query({
  args: {
    games_id: v.id("games"),
  },
  handler: async (ctx, args) => {
    const swaps = await ctx.db
      .query("swaps")
      .withIndex("by_games", (q) => q.eq("games_id", args.games_id))
      .collect();
    if (swaps.length > 1) throw new Error("Критическая ошибка с обменами!");
    if (swaps.length === 0) return null;
    return swaps[0];
  },
});

export const refuse = mutation({
  args: {
    swaps_id: v.id("swaps"),
  },
  handler: async (ctx, args) => {
    const swap = await ctx.db.get(args.swaps_id);
    if (!swap) throw new Error("Такого обмена не существует");
    const game = await ctx.db.get(swap.games_id);
    if (!game) throw new Error("Такой игры не существует");
    if (!game.current) throw new Error("Текущий ход никому не принадлежит");

    const sch = await ctx.db.system.query("_scheduled_functions").collect();
    for (const s of sch) await ctx.scheduler.cancel(s._id);

    await ctx.db.patch(swap.games_id, {
      timer: Date.now() + 90 * 1000,
    });
    await ctx.scheduler.runAfter(90000, internal.players.internalLose, {
      players_id: game.current,
    });
    await ctx.db.delete(swap._id);
  },
});

export const internalRefuse = internalMutation({
  args: {
    swaps_id: v.id("swaps"),
  },
  handler: async (ctx, args) => {
    const swap = await ctx.db.get(args.swaps_id);
    if (!swap) throw new Error("Такого обмена не существует");
    const game = await ctx.db.get(swap.games_id);
    if (!game) throw new Error("Такой игры не существует");
    if (!game.current) throw new Error("Текущий ход никому не принадлежит");

    const sch = await ctx.db.system.query("_scheduled_functions").collect();
    for (const s of sch) await ctx.scheduler.cancel(s._id);

    await ctx.db.patch(swap.games_id, {
      timer: Date.now() + 90 * 1000,
    });
    await ctx.scheduler.runAfter(90000, internal.players.internalLose, {
      players_id: game.current,
    });
    await ctx.db.delete(swap._id);
  },
});

export const concur = mutation({
  args: {
    swaps_id: v.id("swaps"),
  },
  handler: async (ctx, args) => {
    const swap = await ctx.db.get(args.swaps_id);
    if (!swap) throw new Error("Такого обмена не существует");
    const game = await ctx.db.get(swap.games_id);
    if (!game) throw new Error("Такой игры не существует");
    if (!game.current) throw new Error("Текущий ход никому не принадлежит");

    const sch = await ctx.db.system.query("_scheduled_functions").collect();
    for (const s of sch) await ctx.scheduler.cancel(s._id);

    const sender = await ctx.db.get(swap.sender);
    const recipient = await ctx.db.get(swap.recipient);
    if (!sender || !recipient) throw new Error("Что-то пошло не так!");

    await ctx.db.patch(sender._id, {
      balance: sender.balance - swap.sender_money + swap.recipient_money,
    });
    await ctx.db.patch(recipient._id, {
      balance: recipient.balance + swap.sender_money - swap.recipient_money,
    });

    for (let cardId of swap.sender_cards) {
      await ctx.db.patch(cardId, {
        owner: recipient._id,
      });
    }
    for (let cardId of swap.recipient_cards) {
      await ctx.db.patch(cardId, {
        owner: sender._id,
      });
    }

    const trainCards = await ctx.db
      .query("cards")
      .withIndex("by_games", (q) => q.eq("games_id", swap.games_id))
      .filter((q) => q.eq(q.mod(q.field("index"), 5), 0))
      .collect();

    for (let card of trainCards) {
      if (card.owner) {
        const count = trainCards.filter((item) => item.owner === card.owner).length;
        await ctx.db.patch(card._id, {
          status: count - 1,
        });
      }
    }

    const natureCards = await ctx.db
      .query("cards")
      .withIndex("by_games", (q) => q.eq("games_id", swap.games_id))
      .filter((q) => q.or(q.eq(q.field("index"), 12), q.eq(q.field("index"), 28)))
      .collect();

    for (let card of natureCards) {
      if (card.owner) {
        const count = natureCards.filter((item) => item.owner === card.owner).length;
        await ctx.db.patch(card._id, {
          status: count - 1,
        });
      }
    }

    await ctx.db.patch(swap.games_id, {
      timer: Date.now() + 90 * 1000,
    });
    await ctx.scheduler.runAfter(90000, internal.players.internalLose, {
      players_id: game.current,
    });
    await ctx.db.delete(swap._id);
  },
});

export const create = mutation({
  args: {
    games_id: v.id("games"),
    sender: v.id("players"),
    recipient: v.id("players"),
    sender_money: v.number(),
    recipient_money: v.number(),
    sender_cards: v.array(v.id("cards")),
    recipient_cards: v.array(v.id("cards")),
  },
  handler: async (ctx, args) => {
    const swaps = await ctx.db
      .query("swaps")
      .withIndex("by_games", (q) => q.eq("games_id", args.games_id))
      .collect();

    if (swaps.length > 0) throw new Error("Критическая ошибка с обменами!");
    await ctx.db.patch(args.games_id, {
      timer: 0,
    });
    const swaps_id = await ctx.db.insert("swaps", {
      timer: Date.now() + 90000,
      sender: args.sender,
      recipient: args.recipient,
      games_id: args.games_id,
      sender_cards: args.sender_cards,
      recipient_cards: args.recipient_cards,
      sender_money: args.sender_money,
      recipient_money: args.recipient_money,
    });
    const sch = await ctx.db.system.query("_scheduled_functions").collect();
    for (const s of sch) await ctx.scheduler.cancel(s._id);
    await ctx.scheduler.runAfter(90000, internal.swaps.internalRefuse, {
      swaps_id,
    });
  },
});
