import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicRoutes, apiAuthPrefix } from "@/utils/routes";

// Helper to check if a path is public or API auth
function isPublicRoute(path: string) {
    return publicRoutes.some((route) => path === route || path.startsWith(route + "/"));
}

function isApiAuthRoute(path: string) {
    return path.startsWith(apiAuthPrefix);
}

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Allow public and API auth routes through
    if (isPublicRoute(pathname) || isApiAuthRoute(pathname)) {
        return NextResponse.next();
    }

    // Protect all other routes
    const session = await auth();
    if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|static|favicon.ico).*)"], // Match all routes except Next.js internals
};