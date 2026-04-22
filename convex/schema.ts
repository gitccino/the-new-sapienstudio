import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { tables as betterAuthTables } from "./betterAuth/schema";

export default defineSchema({
  ...betterAuthTables,
  tasks: defineTable({
    isCompleted: v.boolean(),
    text: v.string(),
  }),
  credits: defineTable({
    userId: v.string(),
    totalCredits: v.number(),
    lastDailyClaimAt: v.optional(v.number()),
    updatedAt: v.number(),
  }).index("userId", ["userId"]),
  stripePayments: defineTable({
    userId: v.string(),
    prodId: v.string(),
    stripeSessionId: v.optional(v.string()), // cs_test_... For seaching in Stripe Dashboard
    stripePaymentIntentId: v.optional(v.string()), // pi_test_... Refunding purpose, Stripe requires the Payment Intent ID
    updatedAt: v.number(),
    fulfilledAt: v.optional(v.number()),
  }).index("userId", ["userId"]),
});
