"use server";

import { rateLimitByKey } from "@/lib/limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { sendMagicLinkUseCase } from "@/use-cases/magic-link";
import { redirect } from "next/navigation";
import { z } from "zod";

export const signInMagicLinkAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
    })
  )
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: input.email, limit: 1, window: 30000 });
    await sendMagicLinkUseCase(input.email);
    redirect("/sign-in/magic");
  });
