import { Subscription } from "@/db/schema";

export function isSubscriptionActive(subscription?: Subscription) {
  if (!subscription) return false;
  return subscription.stripeCurrentPeriodEnd >= new Date();
}
