import { NextRequest, NextResponse } from "next/server";

export const config = { matcher: ["/dashboard/(.*)"] };

export async function middleware(request: NextRequest) {

  return NextResponse.next();
}
