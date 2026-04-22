import { v } from "convex/values";
import { action, internalAction } from "../_generated/server";
import { requireUser } from "../lib/auth";
import Stripe from "stripe";
import { internal } from "../_generated/api";
import { PRODUCT_OPTIONS } from "../constants/payments";
import { Doc } from "../_generated/dataModel";

export const pay = action({
  args: {
    prodId: v.string(),
  },
  handler: async (ctx, args) => {
    await requireUser(ctx);
    const prodId = args.prodId;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const domain = process.env.NEXT_PUBLIC_SITE_URL;

    // Pre-create the row
    const paymentId = await ctx.runMutation(
      internal.functions.payments.create,
      { prodId },
    );

    // find the option for the provided prodId
    const productOption = PRODUCT_OPTIONS.find(
      (option) => option.lineItem.price_data.product === prodId,
    );
    if (!productOption) throw new Error("Invalid product ID");

    // create stripe.checkout.session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [productOption?.lineItem],
      mode: "payment",
      success_url: `${domain}/collections?success=true`,
      cancel_url: `${domain}/collections?canceled=true`,
      metadata: {
        paymentId,
        prodId,
      },
    });

    // mark payment as pending
    await ctx.runMutation(internal.functions.payments.markPending, {
      paymentId,
      stripeSessionId: session.id,
    });
    return session.url;
  },
});

export const fulfill = internalAction({
  args: { signature: v.string(), payload: v.string() },
  handler: async (ctx, { signature, payload }) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    try {
      const event: Stripe.Event = await stripe.webhooks.constructEventAsync(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const { paymentId, prodId } = session.metadata as {
          paymentId: Doc<"stripePayments">["_id"];
          prodId: string;
        };

        const productOption = PRODUCT_OPTIONS.find(
          (option) => option.lineItem.price_data.product === prodId,
        );
        if (!productOption) throw new Error("Invalid product ID");

        const stripePaymentIntentId = session.payment_intent as
          | string
          | undefined;
        await ctx.runMutation(internal.functions.payments.fulfill, {
          paymentId,
          credits: productOption.credits,
          stripePaymentIntentId,
        });
      }
      return { success: true };
    } catch (error) {
      if (error instanceof Error)
        console.error(`Failed to fulfill payment: ${error.message}`, {
          stack: error.stack,
        });
      return { success: false };
    }
  },
});
