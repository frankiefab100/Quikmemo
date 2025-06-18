import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { apiAuthPrefix, authRoutes, publicRoutes } from "@/utils/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute =
    publicRoutes.some((route) =>
      nextUrl.pathname === route || nextUrl.pathname.startsWith(route + "/")
    );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // if it is an API Next Auth route, we don't want to redirect
  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};