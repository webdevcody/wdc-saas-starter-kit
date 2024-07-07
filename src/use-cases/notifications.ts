import {
  deleteNotification,
  getNotificationById,
  getReadNotificationsForUser,
  getUnreadNotificationsForUser,
  updateNotification,
} from "@/data-access/notifications";
import { UserSession } from "./types";
import { AuthenticationError, NotFoundError } from "@/app/util";

export async function assertOwnsNotification(
  authenticatedUser: UserSession,
  notificationId: number
) {
  const notification = await getNotificationById(notificationId);

  if (!notification) {
    throw new NotFoundError("notification not found");
  }

  if (notification.userId !== authenticatedUser.id) {
    throw new AuthenticationError();
  }

  return notification;
}

export async function markNotificationAsReadUseCase(
  authenticatedUser: UserSession,
  notificationId: number
) {
  await assertOwnsNotification(authenticatedUser, notificationId);
  return await updateNotification(notificationId, {
    isRead: true,
  });
}

export async function clearReadNotificationsUseCase(
  authenticatedUser: UserSession
) {
  const unreadNotifications = await getReadNotificationsForUser(
    authenticatedUser.id
  );

  await Promise.all(
    unreadNotifications.map((notification) =>
      deleteNotification(notification.id)
    )
  );
}

export async function markAllNotificationsAsReadUseCase(
  authenticatedUser: UserSession
) {
  const unreadNotifications = await getUnreadNotificationsForUser(
    authenticatedUser.id
  );

  await Promise.all(
    unreadNotifications.map((notification) =>
      updateNotification(notification.id, {
        isRead: true,
      })
    )
  );
}
