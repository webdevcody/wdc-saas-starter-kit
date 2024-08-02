import { Subscription } from "@/db/schema";

export function isSubscriptionExpired(subscription: Subscription) {
  return subscription.stripeCurrentPeriodEnd < new Date();
}
