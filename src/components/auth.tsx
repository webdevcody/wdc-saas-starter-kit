import { getCurrentUser } from "@/lib/session";
import { ReactNode } from "react";

export async function SignedIn({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  return user && <>{children}</>;
}

export async function SignedOut({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  return !user && <>{children}</>;
}
