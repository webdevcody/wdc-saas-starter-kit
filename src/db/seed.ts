import "dotenv/config";

import { database, pg } from "./index";
import { groups, users } from "@/db/schema";

async function main() {
  const [user] = await database
    .insert(users)
    .values({
      name: "Rick James",
      email: "testing@example.com",
      emailVerified: undefined,
      image: undefined,
      id: "616d6471-e7c8-44f5-866b-0126b0d467c2",
    })
    .onConflictDoNothing()
    .returning();

  const [group] = await database
    .insert(groups)
    .values({
      name: "Test Group",
      description: "This is a test group",
      isPublic: true,
      userId: user.id,
    })
    .returning();

  await pg.end();
}

main();
