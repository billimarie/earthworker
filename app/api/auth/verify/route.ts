import { NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.redirect("/login?error=invalid-token")
    }

    const decoded = verify(token, process.env.JWT_SECRET_KEY!)
    const cookieStore = cookies()
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return NextResponse.redirect("/")
  } catch (error) {
    return NextResponse.redirect("/login?error=invalid-token")
  }
}

