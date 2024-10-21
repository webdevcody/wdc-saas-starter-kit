import { database } from "@/db";
import { newsletters } from "@/db/schema";

export async function saveNewsletterSubscription(email: string) {
  await database
    .insert(newsletters)
    .values({
      email,
    })
    .onConflictDoNothing(); // we need onConflictDoNothing because if the same person tries to subscribe twice, we shouldn't crash for them
}
