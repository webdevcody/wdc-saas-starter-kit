// This file is to get the migration to run in the Dockerfile right
// before the service runs.

import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const pg = postgres(process.env.DATABASE_URL!);
const database = drizzle(pg);

async function main() {
  await migrate(database, { migrationsFolder: ".." });
  await pg.end();
}

main();
