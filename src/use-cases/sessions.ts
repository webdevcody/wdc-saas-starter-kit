import { deleteSessionForUser } from "@/data-access/sessions";
import { UserSession } from "./types";

export async function invalidateSessionsUseCase(user: UserSession) {
  await deleteSessionForUser(user.id);
}
