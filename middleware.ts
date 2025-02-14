import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

// Add paths that don't require authentication
const publicPaths = ["/", "/login", "/api/auth"]

export function middleware(request: NextRequest) {
  const isPublicPath = publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (isPublicPath) {
    return NextResponse.next()
  }

  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    verify(token, process.env.JWT_SECRET_KEY!)
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

