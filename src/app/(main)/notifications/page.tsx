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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <h1
            className={cn(pageTitleStyles, "flex justify-between items-center")}
          >
            Your Notifications
          </h1>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
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
                  className="p-4 sm:p-6 md:p-8 border rounded-xl space-y-4 w-full"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification)}
                    </div>
                    <div className="space-y-2 flex-grow">
                      <h3 className="text-lg sm:text-xl">
                        {notification.message}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-900 dark:text-gray-200">
                        {formatDate(notification.createdOn)}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <ViewButton notification={notification} />
                    </div>
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
