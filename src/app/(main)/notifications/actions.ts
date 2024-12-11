"use server";

import { authenticatedAction } from "@/lib/safe-action";
import {
  clearReadNotificationsUseCase,
  markAllNotificationsAsReadUseCase,
  markNotificationAsReadUseCase,
} from "@/use-cases/notifications";
import { getNotificationLink } from "@/util/notifications";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const markAllNotificationsAsReadAction = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    await markAllNotificationsAsReadUseCase(ctx.user);
    revalidatePath("/notifications");
    revalidatePath("/", "layout");
  });

export const clearReadNotificationsAction = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    await clearReadNotificationsUseCase(ctx.user);
    revalidatePath("/notifications");
  });

export const readNotificationAction = authenticatedAction
  .createServerAction()
  .input(z.object({ notificationId: z.number() }))
  .handler(async ({ ctx, input }) => {
    const notification = await markNotificationAsReadUseCase(
      ctx.user,
      input.notificationId
    );
    redirect(getNotificationLink(notification));
  });
