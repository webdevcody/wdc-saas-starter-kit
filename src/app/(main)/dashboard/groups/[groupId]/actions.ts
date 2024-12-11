"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { getPublicGroupInfoByIdUseCase } from "@/use-cases/groups";
import { sendInviteUseCase } from "@/use-cases/invites";
import { joinGroupUseCase, leaveGroupUseCase } from "@/use-cases/membership";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const joinGroupAction = authenticatedAction
  .createServerAction()
  .input(z.number())
  .handler(async ({ input: groupId, ctx }) => {
    await joinGroupUseCase(ctx.user, groupId);
    revalidatePath(`/dashboard/groups/${groupId}`, "layout");
  });

export const leaveGroupAction = authenticatedAction
  .createServerAction()
  .input(z.number())
  .handler(async ({ input: groupId, ctx }) => {
    const group = await getPublicGroupInfoByIdUseCase(groupId);
    await leaveGroupUseCase(ctx.user, groupId);
    if (group?.isPublic) {
      revalidatePath(`/dashboard/groups/${groupId}`, "layout");
    } else {
      redirect("/dashboard");
    }
  });

export const sendInviteAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      groupId: z.number(),
    })
  )
  .handler(async ({ input: { email, groupId }, ctx }) => {
    await sendInviteUseCase(ctx.user, { email, groupId });
  });
