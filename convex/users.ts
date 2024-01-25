import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Ошибочка");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("token", identity.tokenIdentifier))
      .unique();
    if (user !== null) {
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }
    return await ctx.db.insert("users", {
      name: identity.name!,
      token: identity.tokenIdentifier,
      picture:
        identity.pictureUrl ||
        "https://www.rlmillerllc.com/wp-content/uploads/2017/07/default-user-image.png",
      email: identity.email!,
    });
  },
});

export const get = query({
  args: { users_id: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.users_id);
    if (user === null) {
      throw new Error("Ошибочка");
    }
    return user;
  },
});
