// middleware.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default async function middleware(req) {
    const session = await auth();
    if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"], // Protect dashboard routes
};