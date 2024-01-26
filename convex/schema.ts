import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    token: v.string(),
    picture: v.string(),
    name: v.string(),
  }).index("by_token", ["token"]),
  games: defineTable({
    started: v.number(),
    admin: v.id("users"),
    open: v.boolean(),
    winner: v.optional(v.id("users")),
    current: v.number(),
    players_count: v.number(),
  }),
});
