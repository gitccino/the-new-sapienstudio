import { mutation, query } from "../_generated/server";
import { getUser, requireUser } from "../lib/auth";
import { DAILY_REWARD_AMOUNT } from "../constants/credits";
import { v } from "convex/values";

const verifySameDayUTC = (lastClaimDate: Date) => {
  const nowDate = new Date(Date.now());
  return (
    lastClaimDate.getUTCFullYear() === nowDate.getUTCFullYear() &&
    lastClaimDate.getUTCMonth() === nowDate.getUTCMonth() &&
    lastClaimDate.getUTCDate() === nowDate.getUTCDate()
  );
};

type BalanceResult =
  | { status: "unauthorized" }
  | { status: "not_found" }
  | { status: "success"; balance: number };

/**
 * Get user credits balance
 */
export const getBalance = query({
  args: {},
  handler: async (ctx): Promise<BalanceResult> => {
    const user = await getUser(ctx);
    if (!user) return { status: "unauthorized" };

    const wallet = await ctx.db
      .query("credits")
      .withIndex("userId", (q) => q.eq("userId", user._id))
      .unique();
    if (!wallet) return { status: "not_found" };
    return { status: "success", balance: wallet.totalCredits };
  },
});

/**
 * Initialize the wallet (throw error if unauthorized)
 */
export const initializeWallet = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await requireUser(ctx);
    // if (!user) return { status: "unauthorized" };

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

type ClaimResult =
  | { status: "success"; message: string }
  | { status: "already_claimed"; message: string };

/**
 * Claim user daily reward (throw error if unauthorized)
 */
export const claimDailyReward = mutation({
  args: {},
  handler: async (ctx): Promise<ClaimResult> => {
    const user = await requireUser(ctx);
    const userId = user._id;

    const wallet = await ctx.db
      .query("credits")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .unique();
    const now = Date.now();
    if (!wallet) {
      // initialize if not exists
      await ctx.db.insert("credits", {
        userId,
        totalCredits: DAILY_REWARD_AMOUNT,
        updatedAt: now,
        lastDailyClaimAt: now,
      });
      return {
        status: "success",
        message: "Daily reward claimed successfully",
      };
    }

    if (wallet.lastDailyClaimAt !== undefined) {
      // Check last claim
      const lastClaimDate = new Date(wallet.lastDailyClaimAt);
      const isSameDayUTC = verifySameDayUTC(lastClaimDate);

      if (isSameDayUTC)
        return {
          status: "already_claimed",
          message: "Already claimed",
        };
    }

    const newBalance = wallet.totalCredits + DAILY_REWARD_AMOUNT;
    await ctx.db.patch(wallet._id, {
      totalCredits: newBalance,
      lastDailyClaimAt: now,
      updatedAt: now,
    });

    return {
      status: "success",
      message: "Daily reward claimed successfully",
    };
  },
});

type ClaimStatusResult = {
  status: "unauthorized" | "success";
  canClaim: boolean;
};

/**
 * Get claim status
 */
export const getDailyClaimStatus = query({
  args: {},
  handler: async (ctx): Promise<ClaimStatusResult> => {
    const user = await getUser(ctx);
    if (!user) return { status: "unauthorized", canClaim: false };
    const userId = user._id;
    const wallet = await ctx.db
      .query("credits")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .unique();

    if (!wallet || wallet.lastDailyClaimAt === undefined)
      return { status: "success", canClaim: true };

    const lastClaimDate = new Date(wallet.lastDailyClaimAt);
    const isSameDayUTC = verifySameDayUTC(lastClaimDate);
    return { status: "success", canClaim: !isSameDayUTC };
    // return { status: "success", canClaim: true }; // Testing purpose
  },
});

// --- Stripe integration ---
export const adjustCredits = mutation({
  args: {
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    if (args.amount <= 0)
      throw new Error("Invalid argument: Negative value is not supported");
    const user = await requireUser(ctx);
    const userId = user._id;

    const wallet = await ctx.db
      .query("credits")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .unique();
    if (!wallet) throw new Error("Wallet doesn't exist");

    const newBalance = wallet.totalCredits + args.amount;
    await ctx.db.patch(wallet._id, {
      totalCredits: newBalance,
      updatedAt: Date.now(),
    });
    return {
      status: "success",
      balance: newBalance,
    };
  },
});
