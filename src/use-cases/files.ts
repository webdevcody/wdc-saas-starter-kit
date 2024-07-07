import { MAX_UPLOAD_IMAGE_SIZE } from "@/app-config";
import { getGroupById, updateGroup } from "@/data-access/groups";
import { GroupId } from "@/db/schema";
import {
  getFileUrl,
  getPresignedPostUrl,
  uploadFileToBucket,
} from "@/lib/files";
import {
  assertAdminOrOwnerOfGroup,
  assertGroupVisible,
  hasAccessToGroup,
  isAdminOrOwnerOfGroup,
} from "@/use-cases/authorization";
import { UserSession } from "@/use-cases/types";
import { createUUID } from "@/util/uuid";

export async function getGroupImageUploadUrlUseCase(
  authenticatedUser: UserSession,
  { groupId, contentType }: { groupId: GroupId; contentType: string }
) {
  await assertAdminOrOwnerOfGroup(authenticatedUser, groupId);
  const fileName = `${groupId}-image`;
  return getPresignedPostUrl(fileName, contentType);
}

export async function updateGroupImageUseCase(
  authenticatedUser: UserSession,
  { groupId, file }: { groupId: GroupId; file: File }
) {
  if (!file.type.startsWith("image/")) {
    throw new Error("File should be an image.");
  }

  if (file.size > MAX_UPLOAD_IMAGE_SIZE) {
    throw new Error("File size should be less than 5MB.");
  }

  await assertAdminOrOwnerOfGroup(authenticatedUser, groupId);

  const imageId = createUUID();

  await updateGroup(groupId, { bannerId: imageId });
  await uploadFileToBucket(file, getGroupImageKey(groupId, imageId));
}

export function getGroupImageKey(groupId: GroupId, imageId: string) {
  return `groups/${groupId}/images/${imageId}`;
}

export async function getGroupImageUrlUseCase(
  authenticatedUser: UserSession | undefined,
  { groupId, imageId }: { groupId: GroupId; imageId: string }
) {
  await assertGroupVisible(authenticatedUser, groupId);

  const url = await getFileUrl({
    key: getGroupImageKey(groupId, imageId),
  });

  return url;
}
