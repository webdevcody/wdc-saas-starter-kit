import { AuthenticationError, NotFoundError } from "@/app/util";
import { getEvent } from "@/data-access/events";
import { getGroupById } from "@/data-access/groups";
import { getMembership } from "@/data-access/membership";
import { Group, GroupId } from "@/db/schema";
import { UserSession } from "@/use-cases/types";

export function isPremiumUser(user: UserSession) {
  return user.plan !== "free";
}

export function isGroupOwner(user: UserSession, group: Group) {
  return user.id === group.userId;
}

export async function hasAccessToGroup(
  user: UserSession | undefined,
  groupId: GroupId
) {
  const group = await getGroupById(groupId);

  if (!group) {
    throw new Error("Group not found");
  }

  if (group.isPublic) {
    return true;
  }

  if (!user) {
    return false;
  }

  const membership = await getMembership(user.id, groupId);

  const isGroupOwner = group.userId === user.id;
  return !!membership || isGroupOwner;
}

export async function isAdminOrOwnerOfGroup(
  user: UserSession | undefined,
  groupId: GroupId
) {
  if (!user) {
    return false;
  }

  const membership = await getMembership(user.id, groupId);
  const group = await getGroupById(groupId);

  if (!group) {
    throw new Error("Group not found");
  }

  const isAdmin = membership?.role === "admin";
  const isOwner = group.userId === user.id;

  return isAdmin || isOwner;
}

export async function assertAdminOrOwnerOfGroup(
  user: UserSession | undefined,
  groupId: GroupId
) {
  if (!user) {
    throw new NotFoundError("User not found");
  }

  if (!(await isAdminOrOwnerOfGroup(user, groupId))) {
    throw new AuthenticationError();
  }
}

export async function assertGroupOwner(
  user: UserSession | undefined,
  groupId: GroupId
) {
  const group = await getGroupById(groupId);

  if (!group) {
    throw new NotFoundError("Group not found");
  }

  if (!user) {
    throw new AuthenticationError();
  }

  if (!isGroupOwner(user, group)) {
    throw new AuthenticationError();
  }

  return group;
}

export async function assertGroupMember(
  user: UserSession | undefined,
  groupId: GroupId
) {
  const group = await getGroupById(groupId);

  if (!group) {
    throw new NotFoundError("Group not found");
  }

  if (!user) {
    throw new AuthenticationError();
  }

  const membership = await getMembership(user.id, groupId);
  const isGroupOwner = group.userId === user.id;

  if (!membership && !isGroupOwner) {
    throw new AuthenticationError();
  }

  return group;
}

export async function assertGroupVisible(
  user: UserSession | undefined,
  groupId: GroupId
) {
  if (!user) {
    throw new AuthenticationError();
  }

  const group = await assertGroupExists(groupId);

  if (group.isPublic) {
    return { group, user };
  }

  const membership = await getMembership(user.id, groupId);

  const isGroupOwner = group.userId === user.id;
  if (!membership && !isGroupOwner) {
    throw new AuthenticationError();
  }

  return { group, user };
}

export async function assertGroupExists(groupId: GroupId) {
  const group = await getGroupById(groupId);

  if (!group) {
    throw new NotFoundError("Group not found");
  }

  return group;
}

export async function assertEventExists(eventId: number) {
  const event = await getEvent(eventId);

  if (!event) {
    throw new NotFoundError("Event not found");
  }

  return event;
}
