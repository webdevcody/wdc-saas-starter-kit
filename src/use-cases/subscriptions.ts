import {
  createSubscription,
  getSubscription,
  updateSubscription,
} from "@/data-access/subscriptions";
import { Subscription } from "@/db/schema";
import { env } from "@/env";
import { Plan, UserId } from "@/use-cases/types";

export function getSubscriptionPlan(subscription?: Subscription) {
  if (!subscription) {
    return "free";
  } else {
    return subscription.stripePriceId === env.NEXT_PUBLIC_PRICE_ID_PREMIUM
      ? "premium"
      : "basic";
  }
}

export async function getUserPlanUseCase(userId: UserId): Promise<Plan> {
  const subscription = await getSubscription(userId);
  return getSubscriptionPlan(subscription);
}

export async function createSubscriptionUseCase(subscription: {
  userId: UserId;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  stripePriceId: string;
  stripeCurrentPeriodEnd: Date;
}) {
  await createSubscription(subscription);
}

export async function updateSubscriptionUseCase(subscription: {
  stripeSubscriptionId: string;
  stripePriceId: string;
  stripeCurrentPeriodEnd: Date;
}) {
  await updateSubscription(subscription);
}
