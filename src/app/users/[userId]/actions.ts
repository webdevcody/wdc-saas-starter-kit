"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { followUserUseCase, unfollowUserUseCase } from "@/use-cases/following";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const followUserAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      foreignUserId: z.number(),
    })
  )
  .handler(async ({ input: { foreignUserId }, ctx: { user } }) => {
    await followUserUseCase(user, foreignUserId);
    revalidatePath(`users/${foreignUserId}/info`);
  });

export const unfollowUserAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      foreignUserId: z.number(),
    })
  )
  .handler(async ({ input: { foreignUserId }, ctx: { user } }) => {
    await unfollowUserUseCase(user, foreignUserId);
    revalidatePath(`users/${foreignUserId}/info`);
  });
