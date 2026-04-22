/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as constants_credits from "../constants/credits.js";
import type * as constants_payments from "../constants/payments.js";
import type * as functions_credits from "../functions/credits.js";
import type * as functions_payments from "../functions/payments.js";
import type * as http from "../http.js";
import type * as lib_auth from "../lib/auth.js";
import type * as payments_stripe from "../payments/stripe.js";
import type * as task from "../task.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "constants/credits": typeof constants_credits;
  "constants/payments": typeof constants_payments;
  "functions/credits": typeof functions_credits;
  "functions/payments": typeof functions_payments;
  http: typeof http;
  "lib/auth": typeof lib_auth;
  "payments/stripe": typeof payments_stripe;
  task: typeof task;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  betterAuth: import("../betterAuth/_generated/component.js").ComponentApi<"betterAuth">;
};
