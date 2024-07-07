// import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export const config = { matcher: ["/dashboard/(.*)"] };

export async function middleware(request: NextRequest) {
  // const session = await getSession({
  //   req: {
  //     ...request,
  //     headers: {
  //       ...Object.fromEntries(request.headers),
  //     },
  //   },
  // });

  // const redirectUrl = new URL("/api/auth/signin", request.nextUrl.origin);

  // if (!session || (session.expires && new Date(session.expires) < new Date())) {
  //   return NextResponse.redirect(redirectUrl);
  // }

  return NextResponse.next();
}
