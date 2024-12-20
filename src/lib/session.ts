import "server-only";
import { AuthenticationError } from "@/app/(main)/util";
import { createSession, generateSessionToken, validateRequest } from "@/auth";
import { cache } from "react";
import { cookies } from "next/headers";
import { UserId } from "@/use-cases/types";

const SESSION_COOKIE_NAME = "session";

export async function setSessionTokenCookie(
  token: string,
  expiresAt: Date
): Promise<void> {
  const allCookies = await cookies();
  allCookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export async function deleteSessionTokenCookie(): Promise<void> {
  const allCookies = await cookies();
  allCookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

export async function getSessionToken(): Promise<string | undefined> {
  const allCookies = await cookies();
  const sessionCookie = allCookies.get(SESSION_COOKIE_NAME)?.value;
  return sessionCookie;
}

export const getCurrentUser = cache(async () => {
  const { user } = await validateRequest();
  return user ?? undefined;
});

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  return user;
};

export async function setSession(userId: UserId) {
  const token = generateSessionToken();
  const session = await createSession(token, userId);
  await setSessionTokenCookie(token, session.expiresAt);
}
