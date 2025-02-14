import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"

// Mock user database - in production, use a real database
const users = [
  { id: "1", email: "user1@example.com", password: "password1" },
  { id: "2", email: "user2@example.com", password: "password2" },
]

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = sign({ userId: user.id }, process.env.JWT_SECRET_KEY!, { expiresIn: "1h" })

    return NextResponse.json({ token })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

