import "dotenv/config";

import { database, pg } from "./index";
import { accounts, groups, profiles, users } from "@/db/schema";

async function main() {
  const [user] = await database
    .insert(users)
    .values({
      email: "testing@example.com",
      emailVerified: undefined,
    })
    .onConflictDoNothing()
    .returning();

  const [account] = await database
    .insert(accounts)
    .values({
      accountType: "email",
      githubId: undefined,
      googleId: undefined,
      password:
        "39a491e82a8c8b7d85294ce9dde7d91c62895c87e78b289dabb2e55ae5e317ee9285738a2ff5deac5de0c8182592674b28f96882527cb6d90f988fef2b96d9c2",
      salt: "bAxwTKjE6LjYiH/tyYPin7bTGd+Gp2AlaWSJ10W6VDnDXuBeQLQYMHkxRPzuYQ7zfN9EjRE0aFxe5ECoI0TpWAeRWeoxaa/MDfc73dQ+dJA3o5t7lkzpoa8QVdT9DGkY95a24k4z1rGsROywa0VY1splQzPDPa1I7Lo7Sc6P6MU=",
      userId: user.id,
    })
    .onConflictDoNothing()
    .returning();

  const [profile] = await database
    .insert(profiles)
    .values({
      userId: user.id,
      displayName: "Test User",
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
