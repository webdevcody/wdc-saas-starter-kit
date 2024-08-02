import { Subscription } from "@/db/schema";

export function isSubscriptionActive(subscription: Subscription) {
  return subscription.stripeCurrentPeriodEnd >= new Date();
}
