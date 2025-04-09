import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }
}
