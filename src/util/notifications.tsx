import { Notification } from "@/db/schema";
import { Calendar, MessageCircle } from "lucide-react";

export function getNotificationLink(notification: Notification) {
  const urls = {
    event: `/dashboard/groups/${notification.groupId}/events`,
    reply: `/dashboard/groups/${notification.groupId}/posts/${notification.postId}#replies`,
  } as any;
  return urls[notification.type];
}

export function getNotificationIcon(notification: Notification) {
  if (notification.type === "event") {
    return <Calendar className="w-5 h-5" />;
  } else if (notification.type === "reply") {
    return <MessageCircle className="w-5 h-5" />;
  }
}
