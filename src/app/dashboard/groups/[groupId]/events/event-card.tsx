"use client";

import { Event } from "@/db/schema";
import { getEventImageUrl } from "../settings/util";
import Image from "next/image";
import { format } from "date-fns";
import { EventCardActions } from "./event-card-actions";
import { cn } from "@/lib/utils";
import { cardStyles } from "@/styles/common";

export function EventCard({
  event,
  isAdmin,
}: {
  event: Event;
  isAdmin: boolean;
}) {
  return (
    <div key={event.id} className={cn(cardStyles, "p-8 space-y-4")}>
      <div className="flex gap-12">
        <Image
          src={getEventImageUrl(event)}
          width={300}
          height={200}
          alt="image of the group"
          className="rounded-lg max-h-[200px]"
        />
        <div className="flex flex-col gap-4 flex-1">
          <h2 className="text-2xl">{event.name}</h2>
          <p className="text-xl">{format(event.startsOn, "PPp")}</p>
          <p>{event.description}</p>
        </div>

        {isAdmin && <EventCardActions event={event} />}
      </div>
    </div>
  );
}
