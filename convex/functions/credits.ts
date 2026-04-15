import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { authComponent } from "../betterAuth/auth";

type BalanceResult =
  | { status: "unauthorized" }
  | { status: "not_found" }
  | { status: "success"; balance: number };

export const getBalance = query({
  args: {},
  handler: async (ctx): Promise<BalanceResult> => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) return { status: "unauthorized" };

    const wallet = await ctx.db
      .query("credits")
      .withIndex("userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!wallet) return { status: "not_found" };
    return { status: "success", balance: wallet.totalCredits };
  },
});

export const initializeWallet = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) throw new Error("Unauthorized");

    const existing = await ctx.db
      .query("credits")
      .withIndex("userId", (q) => q.eq("userId", user._id))
      .unique();

    if (existing) return existing._id;

    return await ctx.db.insert("credits", {
      userId: user._id,
      totalCredits: 0,
      updatedAt: Date.now(),
    });
  },
});

export const claimDailyReward = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
  },
});
