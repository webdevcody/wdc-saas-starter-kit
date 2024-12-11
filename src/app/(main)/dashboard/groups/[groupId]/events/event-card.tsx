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
    <div key={event.id} className={cn(cardStyles, "p-4 sm:p-8 space-y-4")}>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
        <Image
          src={getEventImageUrl(event)}
          width={300}
          height={200}
          alt="image of the event"
          className="rounded-lg w-full sm:w-auto max-h-[100px] sm:max-h-[200px] object-cover"
        />
        <div className="flex flex-col gap-2 sm:gap-4 flex-1">
          <h2 className="text-xl sm:text-2xl font-semibold">{event.name}</h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            {format(event.startsOn, "PPp")}
          </p>
          <p className="text-sm sm:text-base">{event.description}</p>
        </div>

        {isAdmin && (
          <div className="mt-4 sm:mt-0">
            <EventCardActions event={event} />
          </div>
        )}
      </div>
    </div>
  );
}
