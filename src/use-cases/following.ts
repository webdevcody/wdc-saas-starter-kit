import {
  createFollow,
  deleteFollow,
  getFollow,
  getFollowersForUser,
} from "@/data-access/following";
import { UserId, UserSession } from "./types";

export async function followUserUseCase(
  authenticatedUser: UserSession,
  foreignUserId: UserId
) {
  await createFollow({ userId: authenticatedUser.id, foreignUserId });
}

export async function unfollowUserUseCase(
  authenticatedUser: UserSession,
  foreignUserId: UserId
) {
  await deleteFollow(authenticatedUser.id, foreignUserId);
}

export async function isFollowingUserUseCase(
  authenticatedUser: UserSession,
  foreignUserId: UserId
) {
  const follow = await getFollow(authenticatedUser.id, foreignUserId);
  return !!follow;
}

export async function getFollowersForUserUseCase(userId: UserId) {
  return getFollowersForUser(userId);
}
