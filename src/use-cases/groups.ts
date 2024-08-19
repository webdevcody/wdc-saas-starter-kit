import { MAX_GROUP_LIMIT, MAX_GROUP_PREMIUM_LIMIT } from "@/app-config";
import {
  countUserGroups,
  createGroup,
  deleteGroup,
  getGroupById,
  getGroupMembers,
  getGroupMembersCount,
  getGroupsByMembership,
  getGroupsByUser,
  getPublicGroupsByMembership,
  getPublicGroupsByUser,
  searchPublicGroupsByName,
  updateGroup,
} from "@/data-access/groups";
import { getProfile } from "@/data-access/profiles";
import { getSubscription } from "@/data-access/subscriptions";
import { GroupId } from "@/db/schema";
import {
  assertGroupMember,
  assertGroupOwner,
  assertGroupVisible,
  isAdminOrOwnerOfGroup,
} from "@/use-cases/authorization";
import { MemberInfo, UserId, UserSession } from "@/use-cases/types";
import { omit } from "lodash";
import { getSubscriptionPlan } from "./subscriptions";
import { PublicError } from "./errors";

export async function createGroupUseCase(
  authenticatedUser: UserSession,
  newGroup: {
    name: string;
    description: string;
  }
) {
  const numberOfGroups = await countUserGroups(authenticatedUser.id);

  const subscription = await getSubscription(authenticatedUser.id);
  const plan = getSubscriptionPlan(subscription);

  if (
    numberOfGroups >=
    (plan === "premium" ? MAX_GROUP_PREMIUM_LIMIT : MAX_GROUP_LIMIT)
  ) {
    throw new PublicError("You have reached the maximum number of groups");
  }

  await createGroup({ ...newGroup, userId: authenticatedUser.id });
}

export async function getPublicGroupsByUserIdUseCase(userId: UserId) {
  return [
    ...(await getPublicGroupsByUser(userId)),
    ...(await getPublicGroupsByMembership(userId)),
  ];
}

export async function getGroupsByUserUseCase(authenticatedUser: UserSession) {
  return [
    ...(await getGroupsByUser(authenticatedUser.id)),
    ...(await getGroupsByMembership(authenticatedUser.id)),
  ];
}

export async function getPublicGroupInfoByIdUseCase(groupId: GroupId) {
  const group = await getGroupById(groupId);
  if (!group) return undefined;
  return omit(group, "userId");
}

export async function getGroupByIdUseCase(
  authenticatedUser: UserSession,
  groupId: GroupId
) {
  await assertGroupMember(authenticatedUser, groupId);
  return await getGroupById(groupId);
}

export async function searchPublicGroupsUseCase(search: string, page: number) {
  return await searchPublicGroupsByName(search, page);
}

export async function toggleGroupVisibilityUseCase(
  authenticatedUser: UserSession,
  groupId: GroupId
) {
  const group = await assertGroupOwner(authenticatedUser, groupId);

  await updateGroup(groupId, {
    isPublic: !group.isPublic,
  });
}

export async function getGroupMembersUseCase(
  authenticatedUser: UserSession | undefined,
  groupId: GroupId
): Promise<MemberInfo[]> {
  const { group } = await assertGroupVisible(authenticatedUser, groupId);

  const owner = (await getProfile(group.userId))!;
  const members = await getGroupMembers(groupId);

  return [
    {
      name: owner.displayName,
      userId: owner.userId,
      image: owner.image,
      role: "owner",
    },
    ...members.map((member) => ({
      name: member.profile.displayName,
      userId: member.userId,
      image: member.profile.image,
      role: member.role ?? "member",
    })),
  ];
}

export async function getMemberCountUseCase(
  authenticatedUser: UserSession | undefined,
  groupId: GroupId
) {
  await assertGroupVisible(authenticatedUser, groupId);

  // we add one because the owner of the group isn't part of the membership count
  const count = (await getGroupMembersCount(groupId)) + 1;

  return count;
}

export async function updateGroupInfoUseCase(
  authenticatedUser: UserSession,
  {
    groupId,
    info,
  }: {
    groupId: GroupId;
    info: string;
  }
) {
  await assertGroupOwner(authenticatedUser, groupId);
  await updateGroup(groupId, { info });
}

export async function updateGroupSocialLinksUseCase(
  authenticatedUser: UserSession,
  {
    groupId,
    githubLink,
    discordLink,
    xLink,
    youtubeLink,
  }: {
    groupId: GroupId;
    githubLink?: string;
    discordLink?: string;
    xLink?: string;
    youtubeLink?: string;
  }
) {
  await assertGroupOwner(authenticatedUser, groupId);
  await updateGroup(groupId, {
    githubLink,
    discordLink,
    xLink,
    youtubeLink,
  });
}

export async function updateGroupNameUseCase(
  authenticatedUser: UserSession,
  {
    groupId,
    newName,
  }: {
    groupId: GroupId;
    newName: string;
  }
) {
  await assertGroupOwner(authenticatedUser, groupId);
  await updateGroup(groupId, { name: newName });
}

export async function updateGroupDescriptionUseCase(
  authenticatedUser: UserSession,
  {
    groupId,
    description,
  }: {
    groupId: GroupId;
    description: string;
  }
) {
  await assertGroupOwner(authenticatedUser, groupId);
  await updateGroup(groupId, { description });
}

export async function deleteGroupUseCase(
  authenticatedUser: UserSession,
  { groupId }: { groupId: GroupId }
) {
  await assertGroupOwner(authenticatedUser, groupId);
  await deleteGroup(groupId);
}

export async function isAdminOrOwnerOfGroupUseCase(
  authenticatedUser: UserSession | undefined,
  groupId: GroupId
) {
  return isAdminOrOwnerOfGroup(authenticatedUser, groupId);
}
