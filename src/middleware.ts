import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PUBLIC_ROUTES, ROUTES } from "@/config/routes";
import { REFRESH_TOKEN_KEY } from "@/config/constants";

/**
 * Next.js Middleware — Route Protection
 *
 * Runs at the edge BEFORE any page renders.
 * Checks for a refresh token cookie to decide if the user is authenticated.
 *
 * Why refresh token cookie?
 *   → The access token is stored in sessionStorage (JS-only).
 *     Middleware runs on the server/edge and can't access sessionStorage.
 *     The refresh token in a cookie IS accessible here, giving us a
 *     cheap way to know if the user has an active session.
 *
 * ⚠️  This is a "soft" guard — the real auth check happens in AuthGuard
 *     (client-side) and on every API request (JWT verification server-side).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasRefreshToken = !!request.cookies.get(REFRESH_TOKEN_KEY)?.value;
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  // 1. Unauthenticated user trying to access a protected route → redirect to login
  if (!isPublicRoute && !hasRefreshToken) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set("from", pathname); // preserve intended destination
    return NextResponse.redirect(loginUrl);
  }

  // 2. Authenticated user visiting login/register → redirect to dashboard
  if (isPublicRoute && hasRefreshToken) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware on all routes except:
  // - Next.js internals (_next)
  // - Static files (images, fonts, favicon)
  // - API routes (if any)
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
