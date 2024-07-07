"use server";

import { lucia, validateRequest } from "@/auth";
import { authenticatedAction } from "@/lib/safe-action";
import { markNotificationAsReadUseCase } from "@/use-cases/notifications";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const markNotificationAsReadAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      notificationId: z.number(),
    })
  )
  .handler(async ({ input: { notificationId }, ctx: { user } }) => {
    await markNotificationAsReadUseCase(user, notificationId);
    revalidatePath(`/`, "layout");
  });

export async function signOutAction() {
  const { session } = await validateRequest();

  if (!session) {
    redirect("/sign-in");
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  redirect("/signed-out");
}
