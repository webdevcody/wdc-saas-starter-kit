"use server";

import { rateLimitByKey } from "@/lib/limiter";
import { authenticatedAction } from "@/lib/safe-action";
import { createGroupUseCase } from "@/use-cases/groups";
import { toZSAError } from "@/util/zsa-mapper";
import { schema } from "./validation";
import { revalidatePath } from "next/cache";

export const createGroupAction = authenticatedAction
  .createServerAction()
  .input(schema)
  .handler(async ({ input: { name, description }, ctx: { user } }) => {
    await rateLimitByKey({
      key: `${user.id}-create-group`,
    }).catch(toZSAError);
    await createGroupUseCase(user, {
      name,
      description,
    });
    revalidatePath("/dashboard");
  });
