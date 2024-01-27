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
    current: v.number(),
    players_count: v.number(),
  }),
  players: defineTable({
    selected: v.number(),
    position: v.number(),
    balance: v.number(),
    loser: v.boolean(),
    order: v.number(),
    users_id: v.id("users"),
    games_id: v.id("games"),
  }),
  messages: defineTable({
    message: v.string(),
    players_id: v.optional(v.id("players")),
    games_id: v.id("games"),
  }),
});
