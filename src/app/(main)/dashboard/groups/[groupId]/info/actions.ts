"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { updateGroupInfoUseCase } from "@/use-cases/groups";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";

export const updateGroupInfoAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      groupId: z.number(),
      info: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    await updateGroupInfoUseCase(ctx.user, {
      groupId: input.groupId,
      info: sanitizeHtml(input.info),
    });

    revalidatePath(`/dashboard/groups/${input.groupId}/info`);
  });
