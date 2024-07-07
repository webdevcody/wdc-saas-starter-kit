import { database } from "@/db";
import { Following, following } from "@/db/schema";
import { UserId } from "@/use-cases/types";
import { and, eq } from "drizzle-orm";

export async function createFollow(newFollow: {
  userId: UserId;
  foreignUserId: UserId;
}) {
  const [follow] = await database
    .insert(following)
    .values(newFollow)
    .onConflictDoNothing()
    .returning();
  return follow;
}

export async function deleteFollow(userId: UserId, foreignUserId: UserId) {
  await database
    .delete(following)
    .where(
      and(
        eq(following.userId, userId),
        eq(following.foreignUserId, foreignUserId)
      )
    );
}

export async function getFollow(userId: UserId, foreignUserId: UserId) {
  return await database.query.following.findFirst({
    where: and(
      eq(following.userId, userId),
      eq(following.foreignUserId, foreignUserId)
    ),
  });
}

export async function getFollowersForUser(userId: UserId) {
  const followers = await database.query.following.findMany({
    where: eq(following.foreignUserId, userId),
    with: {
      userProfile: true,
    },
  });

  return followers.map((follow) => follow.userProfile);
}
