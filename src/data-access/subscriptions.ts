import { database } from "@/db";
import { subscriptions } from "@/db/schema";
import { UserId } from "@/use-cases/types";
import { and, eq, lte } from "drizzle-orm";

export async function createSubscription(subscription: {
  userId: UserId;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  stripePriceId: string;
  stripeCurrentPeriodEnd: Date;
}) {
  await database.insert(subscriptions).values(subscription);
}

export async function updateSubscription(subscription: {
  stripeSubscriptionId: string;
  stripePriceId: string;
  stripeCurrentPeriodEnd: Date;
}) {
  await database
    .update(subscriptions)
    .set({
      stripePriceId: subscription.stripePriceId,
      stripeCurrentPeriodEnd: subscription.stripeCurrentPeriodEnd,
    })
    .where(
      and(
        eq(
          subscriptions.stripeSubscriptionId,
          subscription.stripeSubscriptionId
        ),
        // Stripe can deliver events out of order: an older event must not
        // roll back a period end that a newer event already set.
        lte(
          subscriptions.stripeCurrentPeriodEnd,
          subscription.stripeCurrentPeriodEnd
        )
      )
    );
}

export async function getSubscription(userId: UserId) {
  return await database.query.subscriptions.findFirst({
    where: (subscriptions, { eq }) => eq(subscriptions.userId, userId),
  });
}
