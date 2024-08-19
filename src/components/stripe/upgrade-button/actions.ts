"use server";

import { getUser } from "@/data-access/users";
import { env } from "@/env";
import { authenticatedAction } from "@/lib/safe-action";
import { stripe } from "@/lib/stripe";
import { PublicError } from "@/use-cases/errors";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  priceId: z.union([
    z.literal(env.NEXT_PUBLIC_PRICE_ID_BASIC),
    z.literal(env.NEXT_PUBLIC_PRICE_ID_PREMIUM),
  ]),
});

export const generateStripeSessionAction = authenticatedAction
  .createServerAction()
  .input(schema)
  .handler(async ({ input: { priceId }, ctx: { user } }) => {
    const fullUser = await getUser(user.id);

    if (!fullUser) {
      throw new PublicError("no user found");
    }
    const email = fullUser.email;
    const userId = user.id;

    if (!userId) {
      throw new PublicError("no user id found");
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${env.HOST_NAME}/success`,
      cancel_url: `${env.HOST_NAME}/cancel`,
      payment_method_types: ["card"],
      customer_email: email ? email : undefined,
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    redirect(stripeSession.url!);
  });
