import { database } from "@/db";
import { Event, GroupId, NewEvent, events } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export async function createEvent(newEvent: {
  groupId: GroupId;
  name: string;
  description: string;
  startsOn: Date;
}) {
  const [event] = await database.insert(events).values(newEvent).returning();
  return event;
}

export async function getEvent(eventId: Event["id"]) {
  return await database.query.events.findFirst({
    where: eq(events.id, eventId),
  });
}

export async function getEventsByGroupId(groupId: GroupId) {
  return await database.query.events.findMany({
    where: eq(events.groupId, groupId),
    orderBy: [asc(events.startsOn)],
  });
}

export async function updateEvent(
  eventId: Event["id"],
  updatedEvent: Partial<NewEvent>
) {
  await database.update(events).set(updatedEvent).where(eq(events.id, eventId));
}

export async function deleteEvent(eventId: Event["id"]) {
  await database.delete(events).where(eq(events.id, eventId));
}
