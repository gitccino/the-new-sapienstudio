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
});
