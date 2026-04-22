import type { MutationCtx, QueryCtx, ActionCtx } from "../_generated/server";
import { authComponent } from "../betterAuth/auth";

type AuthCtx = QueryCtx | MutationCtx | ActionCtx;

/**
 * Returns the authenticated user or null.
 * Use in queries where you want to handle the unauthenticated case yourself.
 */
export async function getUser(ctx: AuthCtx) {
  return authComponent.safeGetAuthUser(ctx);
}

/**
 * Returns the authenticated user or throws an Unauthorized error.
 * Use in mutations where an unauthenticated caller should be rejected.
 */
export async function requireUser(ctx: AuthCtx) {
  const user = await authComponent.safeGetAuthUser(ctx);
  if (!user) throw new Error("Unauthorized");
  return user;
}
