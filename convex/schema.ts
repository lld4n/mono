import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    token: v.string(),
    picture: v.string(),
    name: v.string(),
    blocked: v.number(),
    wins: v.number(),
    losers: v.number(),
  }).index("by_token", ["token"]),
  games: defineTable({
    started: v.number(),
    admin: v.id("users"),
    open: v.boolean(),
    winner: v.optional(v.id("users")),
    current: v.optional(v.id("players")),
    players_count: v.number(),
    timer: v.number(),
  }),
  players: defineTable({
    selected: v.number(),
    position: v.number(),
    balance: v.number(),
    loser: v.boolean(),
    prev: v.optional(v.id("players")),
    next: v.optional(v.id("players")),
    user: v.id("users"),
    games_id: v.id("games"),
  }).index("by_games", ["games_id"]),
  messages: defineTable({
    message: v.string(),
    player: v.id("players"),
    games_id: v.id("games"),
  }).index("by_games", ["games_id"]),
  cards: defineTable({
    games_id: v.id("games"),
    index: v.number(),
    owner: v.optional(v.id("players")),
    status: v.number(),
    buy: v.boolean(),
    mortgage: v.boolean(),
  }).index("by_games", ["games_id"]),
  system: defineTable({
    games_id: v.id("games"),
    message: v.string(),
    players: v.id("players"),
    money: v.optional(v.number()),
  }).index("by_games", ["games_id"]),
});
