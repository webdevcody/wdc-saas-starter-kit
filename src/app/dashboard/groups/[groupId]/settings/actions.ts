"use server";

import { authenticatedAction } from "@/lib/safe-action";
import {
  getGroupImageUploadUrlUseCase,
  updateGroupImageUseCase,
} from "@/use-cases/files";
import {
  toggleGroupVisibilityUseCase,
  updateGroupDescriptionUseCase,
  updateGroupNameUseCase,
  updateGroupSocialLinksUseCase,
} from "@/use-cases/groups";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { socialUrlSchema } from "./schema";

export const updateGroupDescriptionAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      groupId: z.number(),
      description: z.string().min(1).max(750),
    })
  )
  .handler(async ({ input, ctx }) => {
    const groupId = input.groupId;
    await updateGroupDescriptionUseCase(ctx.user, {
      groupId,
      description: input.description,
    });
    revalidatePath(`/dashboard/groups/${groupId}/settings`);
  });

export const updateGroupSocialLinksAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      groupId: z.number(),
      ...socialUrlSchema,
    })
  )
  .handler(async ({ input, ctx }) => {
    const groupId = input.groupId;
    await updateGroupSocialLinksUseCase(ctx.user, input);
    revalidatePath(`/dashboard/groups/${groupId}/settings`);
  });

export const updateGroupNameAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      groupId: z.number(),
      name: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    const groupId = input.groupId;
    await updateGroupNameUseCase(ctx.user, {
      groupId,
      newName: input.name,
    });
    revalidatePath(`/dashboard/groups/${groupId}/settings`);
  });

export const toggleGroupVisibilityAction = authenticatedAction
  .createServerAction()
  .input(z.number())
  .handler(async ({ input: groupId, ctx: { user } }) => {
    await toggleGroupVisibilityUseCase(user, groupId);
    revalidatePath(`/dashboard/groups/${groupId}/settings`);
  });

export const getPresignedPostUrlAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      groupId: z.number(),
      contentType: z.string(),
    })
  )
  .handler(async ({ input: { groupId, contentType }, ctx: { user } }) => {
    return await getGroupImageUploadUrlUseCase(user, { groupId, contentType });
  });

export const uploadImageAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      groupId: z.number(),
      fileWrapper: z.instanceof(FormData),
    })
  )
  .handler(async ({ input, ctx: { user } }) => {
    const file = input.fileWrapper.get("file") as File;
    await updateGroupImageUseCase(user, { groupId: input.groupId, file });
    revalidatePath(`/dashboard/groups/${input.groupId}/settings`);
  });
