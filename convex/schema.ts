import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    token: v.string(),
    picture: v.string(),
    name: v.string(),
  }).index("by_token", ["token"]),
});
