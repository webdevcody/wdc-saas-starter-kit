import { database } from "@/db";
import { Membership, memberships } from "@/db/schema";
import { UserId } from "@/use-cases/types";
import { and, eq } from "drizzle-orm";

export async function getMembership(userId: UserId, groupId: number) {
  return await database.query.memberships.findFirst({
    where: and(
      eq(memberships.userId, userId),
      eq(memberships.groupId, groupId)
    ),
  });
}

export async function removeMembership(userId: UserId, groupId: number) {
  await database
    .delete(memberships)
    .where(
      and(eq(memberships.userId, userId), eq(memberships.groupId, groupId))
    );
}

export async function addMembership(userId: UserId, groupId: number) {
  await database.insert(memberships).values({
    userId,
    groupId,
  });
}

export async function getMembershipsByUserId(userId: UserId) {
  return await database.query.memberships.findMany({
    where: eq(memberships.userId, userId),
  });
}

export async function updateMembership(
  membershipId: number,
  updatedMembership: Partial<Membership>
) {
  await database
    .update(memberships)
    .set(updatedMembership)
    .where(eq(memberships.id, membershipId));
}
