import { env } from "@/env";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import type Stripe from "stripe";
import {
  createSubscriptionUseCase,
  updateSubscriptionUseCase,
} from "@/use-cases/subscriptions";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return new Response(
      `Webhook Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await createSubscriptionUseCase({
      userId: parseInt(session.metadata!.userId),
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0]?.price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });
  } else if (
    ["customer.subscription.created", "customer.subscription.updated"].includes(
      event.type
    )
  ) {
    const subscription = event.data.object as Stripe.Subscription;
    // if this fails due to race conditions where checkout.session.completed was not fired first, stripe will retry
    await updateSubscriptionUseCase({
      stripePriceId: subscription.items.data[0]?.price.id,
      stripeSubscriptionId: subscription.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });
  }

  return new Response(null, { status: 200 });
}
