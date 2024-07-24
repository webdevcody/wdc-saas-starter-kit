/**
 * This is an example of an in memory rate limiter you can explicitly use
 * in your server actions or RSC routes.  I personally would only use it to limit
 * server actions which mutate your database or perform costly actions, such as sending out
 * invite emails.  You'd hate to have someone spam your server action and send out 1000s of emails.
 *
 * As a reminder, this type of rate limiter only works when deploying to a single VPS instance.
 * The moment you scale up, you'll need to use a distributed rate limiter such as redis (or use upstash).
 * To keep this starter kit as slim as possible, I decided to NOT require you to also
 * setup a redis instance just to launch your saas product.
 */

import { getIp } from "@/lib/get-ip";
import { RateLimitError } from "./errors";

const PRUNE_INTERVAL = 60 * 1000; // 1 minute

const trackers: Record<
  string,
  {
    count: number;
    expiresAt: number;
  }
> = {};

function pruneTrackers() {
  const now = Date.now();

  for (const key in trackers) {
    if (trackers[key].expiresAt < now) {
      delete trackers[key];
    }
  }
}

setInterval(pruneTrackers, PRUNE_INTERVAL);

export async function rateLimitByIp({
  key = "global",
  limit = 1,
  window = 10000,
}: {
  key?: string;
  limit?: number;
  window?: number;
}) {
  const ip = getIp();

  if (!ip) {
    throw new RateLimitError();
  }

  await rateLimitByKey({
    key: `${ip}-${key}`,
    limit,
    window,
  });
}

export async function rateLimitByKey({
  key = "global",
  limit = 1,
  window = 10000,
}: {
  key?: string;
  limit?: number;
  window?: number;
}) {
  const tracker = trackers[key] || { count: 0, expiresAt: 0 };

  if (!trackers[key]) {
    trackers[key] = tracker;
  }

  if (tracker.expiresAt < Date.now()) {
    tracker.count = 0;
    tracker.expiresAt = Date.now() + window;
  }

  tracker.count++;

  if (tracker.count > limit) {
    throw new RateLimitError();
  }
}
