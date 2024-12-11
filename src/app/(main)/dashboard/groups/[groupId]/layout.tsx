import { GroupHeader } from "@/app/(main)/dashboard/groups/[groupId]/group-header";
import { TabsSection } from "@/app/(main)/dashboard/groups/[groupId]/tabs-section";
import { NotFoundError, PrivateGroupAccessError } from "@/app/(main)/util";
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
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  const groupIdInt = parseInt(groupId);
  const user = await getCurrentUser();

  const group = await getPublicGroupInfoByIdUseCase(groupIdInt);

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

      <TabsSection groupId={groupId} showSettings={isGroupOwner} />

      <div className={pageWrapperStyles}>{children}</div>
    </div>
  );
}
