import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_ROUTES = ["/login", "/signup"]

function getBaseUrl(): string {
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_API_BASE_URL || ""
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL_DEV || "http://azjwfillta.loclx.io "
}

function isPublicRoute(pathname: string): boolean {
  // Only exact matches are public, subroutes like /signup/confirm require auth
  return PUBLIC_ROUTES.includes(pathname)
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip proxy for static files and api routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get("access_token")
  const refreshToken = request.cookies.get("refresh_token")

  // If accessing a public route, allow through
  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }

  // Protected route: if no access token but refresh token exists, try to refresh
  if (!accessToken && refreshToken) {
    try {
      const refreshResponse = await fetch(`${getBaseUrl()}/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refresh_token=${refreshToken.value}`,
        },
      })

      if (refreshResponse.ok) {
        // Get the Set-Cookie headers from the refresh response
        const setCookieHeaders = refreshResponse.headers.getSetCookie()

        // Redirect to the same URL to make a fresh request with new cookies
        // This ensures server components see the new access_token
        const response = NextResponse.redirect(request.url)

        // Forward all Set-Cookie headers to the browser
        for (const cookie of setCookieHeaders) {
          response.headers.append("Set-Cookie", cookie)
        }

        return response
      }
    } catch {
      // Refresh failed, redirect to login
    }

    // No valid refresh, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // No access token and no refresh token, redirect to login
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
