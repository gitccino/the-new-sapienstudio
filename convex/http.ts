import { httpRouter } from "convex/server";
import { authComponent, createAuth } from "./betterAuth/auth";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/stripe",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Get the signature sent by Stripe
    const signature = request.headers.get("stripe-signature") as string;
    // Stripe requires the raw, unparsed text body to verify the cryptographic signature
    const payload = await request.text();

    // run fulfill internalAction
    const result = await ctx.runAction(internal.payments.stripe.fulfill, {
      signature,
      payload,
    });

    if (result.success) {
      return new Response(null, {
        status: 200,
      });
    } else {
      return new Response("Webhook error: failed to fulfill payment", {
        status: 400,
      });
    }
  }),
});

authComponent.registerRoutes(http, createAuth);

export default http;
