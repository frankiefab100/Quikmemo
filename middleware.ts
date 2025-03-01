import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "./lib/auth"

export async function middleware(request: NextRequest) {
  const session = await auth()

  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", request.nextUrl.origin)
    return NextResponse.redirect(loginUrl.toString())
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}