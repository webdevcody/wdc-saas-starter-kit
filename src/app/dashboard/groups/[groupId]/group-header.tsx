import { JoinGroupButton } from "@/app/dashboard/groups/[groupId]/join-group-button";
import { LeaveGroupButton } from "@/app/dashboard/groups/[groupId]/leave-group-button";
import { getGroupImageUrl } from "@/app/dashboard/groups/[groupId]/settings/util";
import { Badge } from "@/components/ui/badge";
import { Group } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import { headerStyles, pageTitleStyles } from "@/styles/common";
import { btnIconStyles } from "@/styles/icons";
import { getUpcomingEventsUseCase } from "@/use-cases/events";
import { getMemberCountUseCase } from "@/use-cases/groups";
import {
  isGroupOwnerUseCase,
  isUserMemberOfGroupUseCase,
} from "@/use-cases/membership";
import { CalendarIcon, LoaderIcon, LockIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

async function MembershipButtons({ group }: { group: Pick<Group, "id"> }) {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const [isGroupOwner, isInGroup] = await Promise.all([
    isGroupOwnerUseCase(user, group.id),
    isUserMemberOfGroupUseCase(user, group.id),
  ]);

  return (
    <div className="flex gap-2 justify-center sm:justify-start">
      {!isGroupOwner && (
        <>{isInGroup ? <LeaveGroupButton /> : <JoinGroupButton />}</>
      )}
    </div>
  );
}

export async function GroupHeader({
  group,
}: {
  group: Pick<Group, "name" | "id" | "isPublic" | "bannerId">;
}) {
  const user = await getCurrentUser();
  const numberOfMembers = await getMemberCountUseCase(user, group.id);
  const upcomingEvents = await getUpcomingEventsUseCase(user, group.id);

  return (
    <div className={cn(headerStyles, "py-4 sm:py-6 md:py-8")}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center sm:items-start sm:flex-row justify-between gap-4 sm:gap-6">
          <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
            <Image
              src={getGroupImageUrl(group)}
              width={80}
              height={80}
              alt="image of the group"
              className="rounded-lg object-cover h-[80px] w-[80px] sm:h-[40px] sm:w-[40px]"
            />

            <div className="space-y-2 sm:space-y-4 text-center sm:text-left">
              <h1 className={cn(pageTitleStyles, "text-2xl sm:text-3xl")}>
                {group.name}
              </h1>

              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-xs sm:text-sm font-medium">
                    {numberOfMembers} members
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-xs sm:text-sm font-medium">
                    {upcomingEvents.length} upcoming events
                  </span>
                </div>

                {!group.isPublic && (
                  <Badge
                    className="p-1 sm:p-2 flex gap-1 sm:gap-2 w-fit px-2 sm:px-4 items-center text-xs sm:text-sm"
                    variant={"outline"}
                  >
                    <LockIcon
                      className={cn(btnIconStyles, "h-3 w-3 sm:h-4 sm:w-4")}
                    />{" "}
                    Private Group
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto mt-4 sm:mt-0">
            <Suspense fallback={<LoaderIcon className="animate-spin" />}>
              <MembershipButtons group={group} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
