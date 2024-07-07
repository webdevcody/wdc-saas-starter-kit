"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { updatePostUseCase } from "@/use-cases/posts";
import {
  createReplyUseCase,
  deleteReplyUseCase,
  updateReplyUseCase,
} from "@/use-cases/replies";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updatePostAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      postId: z.number(),
      message: z.string(),
      title: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    const post = await updatePostUseCase(ctx.user, {
      postId: input.postId,
      message: input.message,
      title: input.title,
    });

    revalidatePath(`/dashboard/groups/${post.groupId}/posts/${post.id}`);
  });

export const updateReplyAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      replyId: z.number(),
      message: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    const updatedReply = await updateReplyUseCase(ctx.user, {
      replyId: input.replyId,
      message: input.message,
    });

    revalidatePath(
      `/dashboard/groups/${updatedReply.groupId}/posts/${updatedReply.postId}`
    );
  });

export const createReplyAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      groupId: z.number(),
      postId: z.number(),
      message: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    const reply = await createReplyUseCase(ctx.user, {
      postId: input.postId,
      message: input.message,
    });

    revalidatePath(`/dashboard/groups/${input.groupId}/posts/${reply.postId}`);
  });

export const deleteReplyAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      replyId: z.number(),
      postId: z.number(),
      groupId: z.number(),
    })
  )
  .handler(async ({ input, ctx }) => {
    await deleteReplyUseCase(ctx.user, {
      replyId: input.replyId,
    });

    revalidatePath(`/dashboard/groups/${input.groupId}/posts/${input.postId}`);
  });
