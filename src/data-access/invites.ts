import { TOKEN_TTL } from "@/app-config";
import { database } from "@/db";
import { GroupId, invites } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getInvite(token: string) {
  return await database.query.invites.findFirst({
    where: eq(invites.token, token),
  });
}

export async function deleteInvite(token: string) {
  await database.delete(invites).where(eq(invites.token, token));
}

export async function createInvite(groupId: GroupId) {
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

  const [invite] = await database
    .insert(invites)
    .values({
      groupId,
      tokenExpiresAt,
    })
    .returning();
  return invite;
}
