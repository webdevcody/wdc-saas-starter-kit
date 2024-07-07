import { GroupId } from "@/db/schema";
import { UserSession } from "./types";
import { getGroupById, getUsersInGroup } from "@/data-access/groups";
import {
  assertAdminOrOwnerOfGroup,
  assertEventExists,
  assertGroupExists,
  assertGroupVisible,
} from "./authorization";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEventsByGroupId,
  updateEvent,
} from "@/data-access/events";
import {
  MAX_UPLOAD_IMAGE_SIZE,
  MAX_UPLOAD_IMAGE_SIZE_IN_MB,
} from "@/app-config";
import { createUUID } from "@/util/uuid";
import { uploadFileToBucket } from "@/lib/files";
import { getGroupImageKey } from "./files";
import { createNotification } from "@/data-access/notifications";
import { NotFoundError } from "@/app/util";

export async function getEventsUseCase(
  authenticatedUser: UserSession | undefined,
  groupId: GroupId
) {
  await assertGroupVisible(authenticatedUser, groupId);
  const events = await getEventsByGroupId(groupId);
  return events;
}

export async function getUpcomingEventsUseCase(
  authenticatedUser: UserSession | undefined,
  groupId: GroupId
) {
  await assertGroupVisible(authenticatedUser, groupId);
  const events = await getEventsByGroupId(groupId);
  const upcomingEvents = events.filter((event) => {
    return new Date(event.startsOn) > new Date();
  });
  return upcomingEvents;
}

export async function createEventUseCase(
  authenticatedUser: UserSession,
  {
    groupId,
    name,
    description,
    startsOn,
    eventImage,
  }: {
    groupId: GroupId;
    name: string;
    description: string;
    startsOn: Date;
    eventImage?: File;
  }
) {
  if (eventImage) {
    if (!eventImage.type.startsWith("image/")) {
      throw new Error("File should be an image.");
    }

    if (eventImage.size > MAX_UPLOAD_IMAGE_SIZE) {
      throw new Error(
        `File size too large. Max size is ${MAX_UPLOAD_IMAGE_SIZE_IN_MB}MB`
      );
    }
  }

  const group = await assertGroupExists(groupId);

  await assertAdminOrOwnerOfGroup(authenticatedUser, groupId);

  const event = await createEvent({
    groupId,
    name,
    description,
    startsOn,
  });

  if (eventImage) {
    const imageId = createUUID();
    await uploadFileToBucket(eventImage, getGroupImageKey(groupId, imageId));
    await updateEvent(event.id, {
      imageId,
    });
  }

  // TODO: this could potentially be passed to a queue
  const usersInGroup = await getUsersInGroup(groupId);

  await Promise.all(
    usersInGroup.map((user) =>
      createNotification({
        userId: user.userId,
        groupId: group.id,
        type: "event",
        message: `An event has been created for the "${group.name}" you joined.`,
        createdOn: new Date(),
      })
    )
  );
}

export async function editEventUseCase(
  authenticatedUser: UserSession,
  {
    eventId,
    name,
    description,
    startsOn,
    eventImage,
  }: {
    eventId: number;
    name: string;
    description: string;
    startsOn: Date;
    eventImage?: File;
  }
) {
  if (eventImage) {
    if (!eventImage.type.startsWith("image/")) {
      throw new Error("File should be an image.");
    }

    if (eventImage.size > MAX_UPLOAD_IMAGE_SIZE) {
      throw new Error(
        `File size too large. Max size is ${MAX_UPLOAD_IMAGE_SIZE_IN_MB}MB`
      );
    }
  }

  const event = await assertEventExists(eventId);
  await assertAdminOrOwnerOfGroup(authenticatedUser, event.groupId);

  await updateEvent(event.id, {
    name,
    description,
    startsOn,
  });

  if (eventImage) {
    const imageId = createUUID();
    await uploadFileToBucket(
      eventImage,
      getGroupImageKey(event.groupId, imageId)
    );
    await updateEvent(event.id, {
      imageId,
    });
  }

  return event;
}
export async function deleteEventUseCase(
  authenticatedUser: UserSession,
  { eventId }: { eventId: number }
) {
  const event = await getEvent(eventId);

  if (!event) {
    throw new NotFoundError("Event not found");
  }

  await assertAdminOrOwnerOfGroup(authenticatedUser, event.groupId);

  await deleteEvent(eventId);

  return event;
}
