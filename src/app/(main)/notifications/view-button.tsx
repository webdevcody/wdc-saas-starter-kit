"use client";

import { Button } from "@/components/ui/button";
import { Notification } from "@/db/schema";
import { getNotificationLink } from "@/util/notifications";
import Link from "next/link";
import { readNotificationAction } from "./actions";
import { useServerAction } from "zsa-react";
import { LoaderButton } from "@/components/loader-button";

export function ViewButton({ notification }: { notification: Notification }) {
  const { execute, isPending } = useServerAction(readNotificationAction);

  return notification.isRead ? (
    <Button className="ml-auto" asChild variant={"secondary"}>
      <Link href={getNotificationLink(notification)}>View</Link>
    </Button>
  ) : (
    <LoaderButton
      className="ml-auto"
      isLoading={isPending}
      onClick={() => {
        execute({ notificationId: notification.id });
      }}
    >
      Read
    </LoaderButton>
  );
}
