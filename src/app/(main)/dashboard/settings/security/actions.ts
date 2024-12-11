"use server";

import { invalidateUserSessions } from "@/auth";
import { authenticatedAction } from "@/lib/safe-action";
import { deleteSessionTokenCookie } from "@/lib/session";
import { redirect } from "next/navigation";

export const invalidateUserSessionsAction = authenticatedAction
  .createServerAction()
  .handler(async ({ input, ctx }) => {
    await invalidateUserSessions(ctx.user.id);
    deleteSessionTokenCookie();
    redirect("/sign-in");
  });
