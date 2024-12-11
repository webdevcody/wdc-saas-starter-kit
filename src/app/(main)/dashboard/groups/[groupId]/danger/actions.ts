"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { deleteGroupUseCase } from "@/use-cases/groups";
import { redirect } from "next/navigation";
import { z } from "zod";

export const deleteGroupAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      groupId: z.number(),
    })
  )
  .handler(async ({ input, ctx }) => {
    const groupId = input.groupId;
    await deleteGroupUseCase(ctx.user, {
      groupId,
    });
    redirect("/dashboard");
  });
