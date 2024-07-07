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
    <div className="flex gap-2">
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
    <div className={cn(headerStyles, "py-8")}>
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="flex flex-col md:flex-row gap-8">
            <Image
              src={getGroupImageUrl(group)}
              width={40}
              height={40}
              alt="image of the group"
              className="rounded-lg object-cover h-[40px]"
            />

            <div className="space-y-4">
              <h1 className={pageTitleStyles}>{group.name} </h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">
                    {numberOfMembers} members
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">
                    {upcomingEvents.length} upcoming events
                  </span>
                </div>

                {!group.isPublic && (
                  <Badge
                    className="p-2 flex gap-2 w-fit px-4 items-center"
                    variant={"outline"}
                  >
                    <LockIcon className={btnIconStyles} /> Private Group
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div>
            <Suspense fallback={<LoaderIcon className="animate-spin" />}>
              <MembershipButtons group={group} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
