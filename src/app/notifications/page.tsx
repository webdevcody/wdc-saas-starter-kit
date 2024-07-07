import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import { cardStyles, pageTitleStyles } from "@/styles/common";
import Image from "next/image";
import { getNotificationsForUserUseCase } from "@/use-cases/users";
import { PageHeader } from "@/components/page-header";
import { formatDate } from "@/util/date";
import { MarkReadAllButton } from "./mark-read-button";
import { ViewButton } from "./view-button";
import { ClearReadButton } from "./clear-read-button";
import { getNotificationIcon } from "@/util/notifications";

export default async function NotificationsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const notifications = await getNotificationsForUserUseCase(user.id);

  return (
    <>
      <PageHeader>
        <div className="flex items-center justify-between">
          <h1
            className={cn(pageTitleStyles, "flex justify-between items-center")}
          >
            Your Notifications
          </h1>

          <div className="flex gap-2">
            <MarkReadAllButton />
            <ClearReadButton />
          </div>
        </div>
      </PageHeader>

      <div className="container mx-auto min-h-screen py-12 max-w-2xl">
        <div className="space-y-8">
          {notifications.length === 0 && (
            <div
              className={cn(
                cardStyles,
                "flex flex-col gap-8 justify-center items-center py-12"
              )}
            >
              <Image
                src="/empty-state/no-data.svg"
                width="200"
                height="200"
                alt="no image placeholder image"
              ></Image>
              <h2 className="text-2xl">You have no notifications</h2>
            </div>
          )}

          <div className="space-y-8">
            {notifications.map((notification) => {
              return (
                <div
                  key={notification.id}
                  className="p-8 border rounded-xl space-y-4 w-full"
                >
                  <div className="flex items-center gap-8">
                    {getNotificationIcon(notification)}
                    <div className="space-y-2">
                      <h3 className="text-xl">{notification.message}</h3>
                      <p className="text-base text-gray-900 dark:text-gray-200">
                        {formatDate(notification.createdOn)}
                      </p>
                    </div>
                    <ViewButton notification={notification} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
