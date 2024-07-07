import { GroupHeader } from "@/app/dashboard/groups/[groupId]/group-header";
import { TabsSection } from "@/app/dashboard/groups/[groupId]/tabs-section";
import { NotFoundError, PrivateGroupAccessError } from "@/app/util";
import { getCurrentUser } from "@/lib/session";
import { pageWrapperStyles } from "@/styles/common";
import { getPublicGroupInfoByIdUseCase } from "@/use-cases/groups";
import {
  isGroupOwnerUseCase,
  isGroupVisibleToUserUseCase,
} from "@/use-cases/membership";
import { ReactNode } from "react";

export default async function GroupLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { groupId: string };
}) {
  const user = await getCurrentUser();

  const group = await getPublicGroupInfoByIdUseCase(parseInt(params.groupId));

  if (!group) {
    throw new NotFoundError("Group not found.");
  }

  const isGroupVisibleToUser = await isGroupVisibleToUserUseCase(
    user,
    group.id
  );

  const isGroupOwner = user ? await isGroupOwnerUseCase(user, group.id) : false;

  if (!isGroupVisibleToUser) {
    throw new PrivateGroupAccessError();
  }

  return (
    <div>
      <GroupHeader group={group} />

      <TabsSection groupId={params.groupId} showSettings={isGroupOwner} />

      <div className={pageWrapperStyles}>{children}</div>
    </div>
  );
}
