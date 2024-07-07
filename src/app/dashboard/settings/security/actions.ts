"use server";

import { lucia } from "@/auth";
import { authenticatedAction } from "@/lib/safe-action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const invalidateUserSessionsAction = authenticatedAction
  .createServerAction()
  .handler(async ({ input, ctx }) => {
    lucia.invalidateUserSessions(ctx.user.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    redirect("/sign-in");
  });
