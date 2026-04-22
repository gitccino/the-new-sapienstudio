import { v } from "convex/values";
import { internalMutation } from "../_generated/server";
import { requireUser } from "../lib/auth";

/**
 * Pre-create the stripePayments row
 */
export const create = internalMutation({
  args: {
    prodId: v.string(),
  },
  handler: async (ctx, { prodId }) => {
    const user = await requireUser(ctx);
    return ctx.db.insert("stripePayments", {
      userId: user._id,
      prodId,
      updatedAt: Date.now(),
    });
  },
});

export const markPending = internalMutation({
  args: {
    paymentId: v.id("stripePayments"),
    stripeSessionId: v.string(),
  },
  handler: async (ctx, { paymentId, stripeSessionId }) => {
    await ctx.db.patch(paymentId, {
      stripeSessionId,
      updatedAt: Date.now(),
    });
  },
});

export const fulfill = internalMutation({
  args: {
    paymentId: v.id("stripePayments"),
    credits: v.number(),
    stripePaymentIntentId: v.optional(v.string()),
  },
  handler: async (ctx, { paymentId, credits, stripePaymentIntentId }) => {
    const now = Date.now();

    const payment = await ctx.db.get(paymentId);
    if (!payment) throw new Error("Payment record not found");

    const wallet = await ctx.db
      .query("credits")
      .withIndex("userId", (q) => q.eq("userId", payment.userId))
      .unique();
    if (!wallet) throw new Error("Wallet doesn't exist");

    await ctx.db.patch(wallet._id, {
      totalCredits: wallet.totalCredits + credits,
      updatedAt: now,
    });

    await ctx.db.patch(paymentId, {
      stripePaymentIntentId,
      fulfilledAt: now,
      updatedAt: now,
    });
  },
});
