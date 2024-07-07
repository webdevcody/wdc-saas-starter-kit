import { database } from "@/db";
import { GroupId, Notification, notifications } from "@/db/schema";
import { UserId } from "@/use-cases/types";
import { and, eq } from "drizzle-orm";

const MAX_NOTIFICATIONS_TO_RETURN = 30;
const MAX_NOTIFICATIONS_IN_HEADER = 3;

export async function createNotification(notification: {
  userId: UserId;
  groupId: GroupId;
  postId?: number;
  type: string;
  message: string;
  createdOn: Date;
}) {
  const [createdNotification] = await database
    .insert(notifications)
    .values(notification)
    .returning();
  return createdNotification;
}

export async function getUnreadNotificationsForUser(userId: UserId) {
  return await database.query.notifications.findMany({
    where: and(
      eq(notifications.userId, userId),
      eq(notifications.isRead, false)
    ),
    limit: MAX_NOTIFICATIONS_TO_RETURN,
  });
}

export async function getReadNotificationsForUser(userId: UserId) {
  return await database.query.notifications.findMany({
    where: and(
      eq(notifications.userId, userId),
      eq(notifications.isRead, true)
    ),
    limit: MAX_NOTIFICATIONS_TO_RETURN,
  });
}

export async function getTop3UnreadNotificationsForUser(userId: UserId) {
  return await database.query.notifications.findMany({
    where: and(
      eq(notifications.userId, userId),
      eq(notifications.isRead, false)
    ),
    limit: MAX_NOTIFICATIONS_IN_HEADER,
  });
}

export async function getNotificationsForUser(userId: UserId) {
  return await database.query.notifications.findMany({
    where: and(eq(notifications.userId, userId)),
    limit: MAX_NOTIFICATIONS_TO_RETURN,
  });
}

export async function getNotificationById(notificationId: number) {
  return await database.query.notifications.findFirst({
    where: eq(notifications.id, notificationId),
  });
}

export async function updateNotification(
  notificationId: number,
  updatedNotification: Partial<Notification>
) {
  const [notification] = await database
    .update(notifications)
    .set(updatedNotification)
    .where(eq(notifications.id, notificationId))
    .returning();
  return notification;
}

export async function deleteNotification(notificationId: number) {
  await database
    .delete(notifications)
    .where(eq(notifications.id, notificationId));
}
