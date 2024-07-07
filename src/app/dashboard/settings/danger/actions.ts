"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { deleteUserUseCase } from "@/use-cases/users";
import { redirect } from "next/navigation";
import { z } from "zod";

export const deleteAccountAction = authenticatedAction
  .createServerAction()
  .input(z.void())
  .handler(async ({ input, ctx: { user } }) => {
    await deleteUserUseCase(user, user.id);
    redirect("/");
  });
