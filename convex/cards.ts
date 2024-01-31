import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { CardsGetType } from "../src/types/CardsGetType";
import { CardClassObject, CardGroupObject } from "../src/constants/cardsObject";
import { Doc } from "./_generated/dataModel";

export const getByGames = query({
  args: {
    games_id: v.id("games"),
  },
  handler: async (ctx, args) => {
    const convexCards = await ctx.db
      .query("cards")
      .filter((q) => q.eq(q.field("games_id"), args.games_id))
      .collect();
    if (convexCards.length === 0) {
      throw new Error("Карточек нет");
    }
    const res: CardsGetType[] = new Array(40).fill(null);
    for (const card of convexCards) {
      res[card.index] = card;
    }
    return res;
  },
});

export const buy = mutation({
  args: {
    cards_id: v.id("cards"),
    players_id: v.id("players"),
    money: v.number(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.players_id);
    const card = await ctx.db.get(args.cards_id);
    if (card === null) {
      throw new Error("Карточка не найдена");
    }
    if (player === null) {
      throw new Error("Игрок не найден");
    }
    if (card.owner) {
      throw new Error("У карточки есть владелец");
    }
    if (player.balance < args.money) {
      throw new Error("Недостаточно денег");
    }
    await ctx.db.patch(player._id, {
      balance: player.balance - args.money,
    });
    const cardClass = CardClassObject[card.index];
    if (cardClass === "street") {
      await ctx.db.patch(card._id, {
        owner: player._id,
        buy: false,
        status: card.status + 1,
      });
    } else if (cardClass === "train" || cardClass === "nature") {
      const group = CardGroupObject[card.index];
      if (group.length === 0) {
        throw new Error("Группу карточки не получилось определить");
      }
      await ctx.db.patch(card._id, {
        owner: player._id,
        buy: false,
      });
      const cardsGroup = await ctx.db
        .query("cards")
        .filter((q) =>
          q.and(
            q.eq(q.field("games_id"), card.games_id),
            q.eq(q.field("owner"), player._id),
            q.eq(q.field("mortgage"), false),
          ),
        )
        .collect();
      if (cardsGroup.length === 0) {
        throw new Error("Список группы пуст");
      }
      let count = 0;
      for (const item of cardsGroup) {
        if (group.includes(item.index)) {
          count++;
        }
      }
      // тут как будто поплыл я немного
      for (const item of cardsGroup) {
        if (group.includes(item.index)) {
          await ctx.db.patch(item._id, {
            status: count - 1,
          });
        }
      }
    } else {
      throw new Error("Класс карточки не получилось определить");
    }
  },
});
export const build = mutation({
  args: {
    cards_id: v.id("cards"),
    players_id: v.id("players"),
    money: v.number(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.players_id);
    const card = await ctx.db.get(args.cards_id);
    if (card === null) {
      throw new Error("Карточка не найдена");
    }
    if (player === null) {
      throw new Error("Игрок не найден");
    }
    if (card.owner !== player._id) {
      throw new Error("Карточка не принадлежит игроку");
    }
    if (card.mortgage) {
      throw new Error("Карточка заложена");
    }
    if (player.balance < args.money) {
      throw new Error("Недостаточно денег");
    }
    if (CardClassObject[card.index] !== "street") {
      throw new Error("Карточка не улица");
    }
    const group = CardGroupObject[card.index];
    const convexCards = await ctx.db
      .query("cards")
      .filter((q) => q.eq(q.field("games_id"), card.games_id))
      .collect();
    const cardsGroup: Doc<"cards">[] = [];
    for (const item of convexCards) {
      if (
        group.includes(item.index) &&
        !item.mortgage &&
        item.owner === player._id
      ) {
        cardsGroup.push(item);
      }
    }
    if (group.length !== cardsGroup.length) {
      throw new Error("Не все карточки из группы принадлежат игроку");
    }
    await ctx.db.patch(player._id, {
      balance: player.balance - args.money,
    });
    await ctx.db.patch(card._id, {
      status: card.status + 1,
    });
  },
});

export const unbuild = mutation({
  args: {
    cards_id: v.id("cards"),
    players_id: v.id("players"),
    money: v.number(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.players_id);
    const card = await ctx.db.get(args.cards_id);
    if (card === null) {
      throw new Error("Карточка не найдена");
    }
    if (player === null) {
      throw new Error("Игрок не найден");
    }
    if (card.owner !== player._id) {
      throw new Error("Карточка не принадлежит игроку");
    }
    if (card.mortgage) {
      throw new Error(
        "Критическая ошибка в логике, карточка не может быть заложена, если у нее можно продать дом",
      );
    }
    if (CardClassObject[card.index] !== "street") {
      throw new Error("Карточка не улица");
    }
    await ctx.db.patch(player._id, {
      balance: player.balance + args.money,
    });
    await ctx.db.patch(card._id, {
      status: card.status - 1,
    });
  },
});

//так и не понял что ты от меня хочешь здесь, крч просто сделаю как написано в задаче
export const mortgage = mutation({
  args: {
    cards_id: v.id("cards"),
    players_id: v.id("players"),
    money: v.number(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.players_id);
    const card = await ctx.db.get(args.cards_id);
    if (card === null) {
      throw new Error("Карточка не найдена");
    }
    if (player === null) {
      throw new Error("Игрок не найден");
    }
    if (card.owner !== player._id) {
      throw new Error("Карточка не принадлежит игроку");
    }
    if (card.mortgage) {
      throw new Error("Карточка уже заложена");
    }
    const cardClass = CardClassObject[card.index];
    if (cardClass === "train" || cardClass === "nature") {
      await ctx.db.patch(player._id, {
        balance: player.balance + args.money,
      });
      await ctx.db.patch(card._id, {
        mortgage: true,
        status: -1,
      });

      const group = CardGroupObject[card.index];
      if (group.length === 0) {
        throw new Error("Группу карточки не получилось определить");
      }
      const cardsGroup = await ctx.db
        .query("cards")
        .filter((q) =>
          q.and(
            q.eq(q.field("games_id"), card.games_id),
            q.eq(q.field("owner"), player._id),
            q.eq(q.field("mortgage"), false),
          ),
        )
        .collect();
      let count = 0;
      for (const item of cardsGroup) {
        if (group.includes(item.index)) {
          count++;
        }
      }
      // тут как будто поплыл я немного
      for (const item of cardsGroup) {
        if (group.includes(item.index)) {
          await ctx.db.patch(item._id, {
            status: count - 1,
          });
        }
      }
    } else if (cardClass === "street") {
      if (card.status !== 0) {
        throw new Error("У карточки есть дома или отель");
      }
      await ctx.db.patch(player._id, {
        balance: player.balance + args.money,
      });
      await ctx.db.patch(card._id, {
        mortgage: true,
        status: -1,
      });
    }
  },
});

export const unmortgage = mutation({
  args: {
    cards_id: v.id("cards"),
    players_id: v.id("players"),
    money: v.number(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.players_id);
    const card = await ctx.db.get(args.cards_id);
    if (card === null) {
      throw new Error("Карточка не найдена");
    }
    if (player === null) {
      throw new Error("Игрок не найден");
    }
    if (card.owner !== player._id) {
      throw new Error("Карточка не принадлежит игроку");
    }

    if (player.balance < args.money) {
      throw new Error("Недостаточно средств");
    }

    if (!card.mortgage) {
      throw new Error("Карточка не заложена");
    }

    const cardClass = CardClassObject[card.index];
    if (cardClass === "train" || cardClass === "nature") {
      await ctx.db.patch(player._id, {
        balance: player.balance - args.money,
      });
      await ctx.db.patch(card._id, {
        mortgage: false,
      });
      const group = CardGroupObject[card.index];
      if (group.length === 0) {
        throw new Error("Группу карточки не получилось определить");
      }
      const cardsGroup = await ctx.db
        .query("cards")
        .filter((q) =>
          q.and(
            q.eq(q.field("games_id"), card.games_id),
            q.eq(q.field("owner"), player._id),
            q.eq(q.field("mortgage"), false),
          ),
        )
        .collect();
      let count = 0;
      for (const item of cardsGroup) {
        if (group.includes(item.index)) {
          count++;
        }
      }
      // тут как будто поплыл я немного
      for (const item of cardsGroup) {
        if (group.includes(item.index)) {
          await ctx.db.patch(item._id, {
            status: count - 1,
          });
        }
      }
    } else if (cardClass === "street") {
      await ctx.db.patch(card._id, {
        status: 0,
      });
    }
  },
});
