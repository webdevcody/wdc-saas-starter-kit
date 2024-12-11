"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { updateGroupInfoUseCase } from "@/use-cases/groups";
import { createPostUseCase, deletePostUseCase } from "@/use-cases/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

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
      info: input.info,
    });

    revalidatePath(`/dashboard/groups/${input.groupId}/info`);
  });

export const createPostAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      groupId: z.number().min(1),
      title: z.string().min(1),
      message: z.string().min(1),
    })
  )
  .handler(async ({ input: { groupId, title, message }, ctx: { user } }) => {
    await createPostUseCase(user, {
      groupId,
      title,
      message,
    });
    revalidatePath(`/dashboard/groups/${groupId}/posts`);
  });

export const deletePostAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      postId: z.number(),
    })
  )
  .handler(async ({ input: { postId }, ctx: { user } }) => {
    const post = await deletePostUseCase(user, {
      postId,
    });
    redirect(`/dashboard/groups/${post.groupId}/posts`);
  });
