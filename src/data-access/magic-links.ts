import { TOKEN_LENGTH, TOKEN_TTL } from "@/app-config";
import { generateRandomToken } from "@/data-access/utils";
import { database } from "@/db";
import { magicLinks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function upsertMagicLink(email: string) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

  await database
    .insert(magicLinks)
    .values({
      email,
      token,
      tokenExpiresAt,
    })
    .onConflictDoUpdate({
      target: magicLinks.email,
      set: {
        token,
        tokenExpiresAt,
      },
    });

  return token;
}

export async function getMagicLinkByToken(token: string) {
  const existingToken = await database.query.magicLinks.findFirst({
    where: eq(magicLinks.token, token),
  });

  return existingToken;
}

export async function deleteMagicToken(token: string) {
  await database.delete(magicLinks).where(eq(magicLinks.token, token));
}
