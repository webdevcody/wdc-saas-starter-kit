"use server";

import { z } from "zod";
import { unauthenticatedAction } from "@/lib/safe-action";
import { rateLimitByIp } from "@/lib/limiter";
import { subscribeEmailUseCase } from "@/use-cases/newsletter";

export const subscribeEmailAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
    })
  )
  .handler(async ({ input: { email } }) => {
    await rateLimitByIp("newsletter", 1);
    await subscribeEmailUseCase(email);
  });
